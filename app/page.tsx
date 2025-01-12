"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { LabCertificate } from "@/lib/supabase";
import CertificateDisplay from "./components/LabCertificate";

type FormData = Omit<
  LabCertificate,
  "id" | "certificate_number" | "date" | "created_at"
>;

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    description: "",
    submitted_by: "",
    customer_name: "",
    sample_point: "",
    physical_tests: {
      ph: 0,
      turbidity: 0,
      conductivity: 0,
      tds: 0,
      temperature: 0,
    },
    chemical_tests_anions: {
      fluoride: 0,
      chloride: 0,
      nitrite: 0,
      bromide: 0,
      nitrate: 0,
      phosphate: 0,
      sulphate: 0,
    },
    chemical_tests_cations: {
      sodium: 0,
      ammonium: 0,
      potassium: 0,
      calcium: 0,
      magnesium: 0,
    },
    other_parameters: {
      free_chlorine: 0,
      total_chlorine: 0,
    },
  });

  const [previewData, setPreviewData] = useState<LabCertificate | null>(null);

  const generateCertificateNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `AQL-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const certificateData: LabCertificate = {
      ...formData,
      id: crypto.randomUUID(),
      certificate_number: generateCertificateNumber(),
      date: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase
        .from("certificates")
        .insert(certificateData);

      if (error) throw error;

      setPreviewData(certificateData);
    } catch (error) {
      console.error("Error creating certificate:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    if (field) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: parseFloat(value) || 0,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold text-center mb-8 text-blue-600'>
          Aquatreat Solutions Laboratory
        </h1>

        <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
          <h2 className='text-2xl font-bold mb-6'>
            Create Laboratory Certificate
          </h2>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block mb-2 font-medium'>Description</label>
                <input
                  type='text'
                  name='description'
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 font-medium'>Submitted By</label>
                <input
                  type='text'
                  name='submitted_by'
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 font-medium'>Customer Name</label>
                <input
                  type='text'
                  name='customer_name'
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 font-medium'>Sample Point</label>
                <input
                  type='text'
                  name='sample_point'
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
            </div>

            {/* Physical Tests */}
            <div>
              <h3 className='text-xl font-bold mb-4'>Physical Tests</h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {Object.keys(formData.physical_tests || {}).map((key) => (
                  <div key={key}>
                    <label className='block mb-2 font-medium capitalize'>
                      {key}
                    </label>
                    <input
                      type='number'
                      name={`physical_tests.${key}`}
                      onChange={handleInputChange}
                      className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
                      step='0.01'
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Chemical Tests (Anions) */}
            <div>
              <h3 className='text-xl font-bold mb-4'>
                Chemical Tests (Anions)
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {Object.keys(formData.chemical_tests_anions || {}).map(
                  (key) => (
                    <div key={key}>
                      <label className='block mb-2 font-medium capitalize'>
                        {key}
                      </label>
                      <input
                        type='number'
                        name={`chemical_tests_anions.${key}`}
                        onChange={handleInputChange}
                        className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
                        step='0.01'
                        required
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Chemical Tests (Cations) */}
            <div>
              <h3 className='text-xl font-bold mb-4'>
                Chemical Tests (Cations)
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {Object.keys(formData.chemical_tests_cations || {}).map(
                  (key) => (
                    <div key={key}>
                      <label className='block mb-2 font-medium capitalize'>
                        {key}
                      </label>
                      <input
                        type='number'
                        name={`chemical_tests_cations.${key}`}
                        onChange={handleInputChange}
                        className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
                        step='0.01'
                        required
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Other Parameters */}
            <div>
              <h3 className='text-xl font-bold mb-4'>Other Parameters</h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {Object.keys(formData.other_parameters || {}).map((key) => (
                  <div key={key}>
                    <label className='block mb-2 font-medium capitalize'>
                      {key.replace("_", " ")}
                    </label>
                    <input
                      type='number'
                      name={`other_parameters.${key}`}
                      onChange={handleInputChange}
                      className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
                      step='0.01'
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type='submit'
              className='w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'>
              Generate Certificate
            </button>
          </form>
        </div>

        {previewData && (
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-bold mb-6'>Certificate Preview</h2>
            <CertificateDisplay data={previewData} />
          </div>
        )}
      </div>
    </div>
  );
}
