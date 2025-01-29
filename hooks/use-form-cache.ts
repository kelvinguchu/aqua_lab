import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/components/certificates/form/types";

type CertificateType =
  | "physical_chemical"
  | "microbiological"
  | "effluent"
  | "irrigation"
  | "borehole";

export function useFormCache(
  form: UseFormReturn<FormValues>,
  type: CertificateType,
  mode: "create" | "edit",
  id?: string
) {
  // Make the cache key type-specific first
  const cacheKey = `form_cache_${type}`;

  // Load cached data on mount
  useEffect(() => {
    try {
      // Get all cache entries
      const allCacheEntries = Object.entries(localStorage)
        .filter(([key]) => key.startsWith(cacheKey))
        .map(([key, value]) => {
          try {
            return {
              key,
              data: JSON.parse(value),
            };
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      // If we're in edit mode and have an ID, look for that specific cache
      if (mode === "edit" && id) {
        const editCache = allCacheEntries.find(
          (entry) =>
            entry?.data.id === id && entry?.data.certificate_type === type
        );
        if (editCache) {
          form.reset(editCache.data);
          return;
        }
      }

      // For create mode or if no specific edit cache found
      if (mode === "create") {
        const createCache = allCacheEntries.find(
          (entry) =>
            entry?.data.certificate_type === type &&
            !entry?.data.id &&
            entry?.key.includes("create")
        );
        if (createCache) {
          form.reset(createCache.data);
        }
      }
    } catch (error) {
      console.error("Error loading cached form data:", error);
      clearTypeCache();
    }
  }, [cacheKey, form, type, mode, id]);

  // Save to cache whenever form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value) {
        const cacheData = {
          ...value,
          id: id || undefined,
          certificate_type: type,
        };

        // Use a more specific key that includes the mode and id
        const specificCacheKey = `${cacheKey}_${mode}${id ? `_${id}` : ""}`;
        localStorage.setItem(specificCacheKey, JSON.stringify(cacheData));

        // Clean up any other caches for this type
        Object.keys(localStorage)
          .filter((key) => key.startsWith(cacheKey) && key !== specificCacheKey)
          .forEach((key) => localStorage.removeItem(key));
      }
    });

    return () => subscription.unsubscribe();
  }, [cacheKey, form, type, mode, id]);

  // Clear cache for this specific type only
  const clearTypeCache = () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(cacheKey))
      .forEach((key) => localStorage.removeItem(key));
  };

  // Clear all form caches
  const clearAllCaches = () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("form_cache_"))
      .forEach((key) => localStorage.removeItem(key));
  };

  return { clearCache: clearTypeCache, clearAllCaches };
}
