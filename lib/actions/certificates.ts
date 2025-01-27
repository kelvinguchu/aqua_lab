"use server";

import { FormValues } from "@/components/certificates/form/types";
import { createClient } from "@/lib/supabase/server";
import { format, parseISO } from "date-fns";

export async function createCertificate(data: FormValues) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        error: "Unauthorized. Please sign in to create certificates.",
        data: null,
      };
    }

    // Format dates for database (YYYY-MM-DD)
    const formatDatabaseDate = (dateStr: string) =>
      format(parseISO(dateStr), "yyyy-MM-dd");

    // Prepare base certificate data
    const certificateData = {
      certificate_id: data.certificate_id,
      sample_id: data.sample_id,
      certificate_type: data.certificate_type,
      description_of_sample: data.description_of_sample,
      sample_source: data.sample_source,
      submitted_by: data.submitted_by,
      customer_contact: data.customer_contact,
      sampled_by: data.sampled_by,
      date_of_report: formatDatabaseDate(data.date_of_report),
      date_of_sampling: formatDatabaseDate(data.date_of_sampling),
      date_sample_received: formatDatabaseDate(data.date_sample_received),
      date_of_analysis: formatDatabaseDate(data.date_of_analysis),
      date_of_report_issue: formatDatabaseDate(data.date_of_report_issue),
      comments: data.comments || null,
      status: "draft" as const,
      created_at: new Date().toISOString(),
    };

    // Save certificate to database
    const { data: savedCertificate, error: saveError } = await supabase
      .from("certificates")
      .insert([certificateData])
      .select()
      .single();

    if (saveError || !savedCertificate) {
      throw new Error(`Failed to save certificate: ${saveError?.message}`);
    }

    // Based on certificate type, save results to appropriate table
    let resultsError;

    switch (data.certificate_type) {
      case "physical_chemical": {
        const physicalChemicalData = data as FormValues & {
          ph_result?: number;
          ph_remark?: string;
          turbidity_result?: number;
          turbidity_remark?: string;
          // ... other physical chemical fields
        };

        ({ error: resultsError } = await supabase
          .from("physical_chemical_results")
          .insert([
            {
              certificate_id: savedCertificate.id,
              // Physical Tests
              ph_result: physicalChemicalData.ph_result || null,
              ph_remark: physicalChemicalData.ph_remark || null,
              turbidity_result: physicalChemicalData.turbidity_result || null,
              turbidity_remark: physicalChemicalData.turbidity_remark || null,
              color_result: physicalChemicalData.color_result || null,
              color_remark: physicalChemicalData.color_remark || null,
              tss_result: physicalChemicalData.tss_result || null,
              tss_remark: physicalChemicalData.tss_remark || null,
              tds_result: physicalChemicalData.tds_result || null,
              tds_remark: physicalChemicalData.tds_remark || null,
              conductivity_result:
                physicalChemicalData.conductivity_result || null,
              conductivity_remark:
                physicalChemicalData.conductivity_remark || null,
              // Chemical Tests (Anions)
              ph_alkalinity_result:
                physicalChemicalData.ph_alkalinity_result || null,
              ph_alkalinity_remark:
                physicalChemicalData.ph_alkalinity_remark || null,
              total_alkalinity_result:
                physicalChemicalData.total_alkalinity_result || null,
              total_alkalinity_remark:
                physicalChemicalData.total_alkalinity_remark || null,
              chloride_result: physicalChemicalData.chloride_result || null,
              chloride_remark: physicalChemicalData.chloride_remark || null,
              fluoride_result: physicalChemicalData.fluoride_result || null,
              fluoride_remark: physicalChemicalData.fluoride_remark || null,
              sulfate_result: physicalChemicalData.sulfate_result || null,
              sulfate_remark: physicalChemicalData.sulfate_remark || null,
              nitrate_result: physicalChemicalData.nitrate_result || null,
              nitrate_remark: physicalChemicalData.nitrate_remark || null,
              nitrite_result: physicalChemicalData.nitrite_result || null,
              nitrite_remark: physicalChemicalData.nitrite_remark || null,
              phosphate_result: physicalChemicalData.phosphate_result || null,
              phosphate_remark: physicalChemicalData.phosphate_remark || null,
              sulfide_result: physicalChemicalData.sulfide_result || null,
              sulfide_remark: physicalChemicalData.sulfide_remark || null,
              // Chemical Tests (Cations)
              potassium_result: physicalChemicalData.potassium_result || null,
              potassium_remark: physicalChemicalData.potassium_remark || null,
              sodium_result: physicalChemicalData.sodium_result || null,
              sodium_remark: physicalChemicalData.sodium_remark || null,
              calcium_result: physicalChemicalData.calcium_result || null,
              calcium_remark: physicalChemicalData.calcium_remark || null,
              magnesium_result: physicalChemicalData.magnesium_result || null,
              magnesium_remark: physicalChemicalData.magnesium_remark || null,
              iron_result: physicalChemicalData.iron_result || null,
              iron_remark: physicalChemicalData.iron_remark || null,
              manganese_result: physicalChemicalData.manganese_result || null,
              manganese_remark: physicalChemicalData.manganese_remark || null,
              ammonia_result: physicalChemicalData.ammonia_result || null,
              ammonia_remark: physicalChemicalData.ammonia_remark || null,
              copper_result: physicalChemicalData.copper_result || null,
              copper_remark: physicalChemicalData.copper_remark || null,
              zinc_result: physicalChemicalData.zinc_result || null,
              zinc_remark: physicalChemicalData.zinc_remark || null,
              chromium_result: physicalChemicalData.chromium_result || null,
              chromium_remark: physicalChemicalData.chromium_remark || null,
              // Other Parameters
              total_hardness_result:
                physicalChemicalData.total_hardness_result || null,
              total_hardness_remark:
                physicalChemicalData.total_hardness_remark || null,
              calcium_hardness_result:
                physicalChemicalData.calcium_hardness_result || null,
              calcium_hardness_remark:
                physicalChemicalData.calcium_hardness_remark || null,
              magnesium_hardness_result:
                physicalChemicalData.magnesium_hardness_result || null,
              magnesium_hardness_remark:
                physicalChemicalData.magnesium_hardness_remark || null,
              silica_result: physicalChemicalData.silica_result || null,
              silica_remark: physicalChemicalData.silica_remark || null,
              free_chlorine_result:
                physicalChemicalData.free_chlorine_result || null,
              free_chlorine_remark:
                physicalChemicalData.free_chlorine_remark || null,
            },
          ]));
        break;
      }

      case "microbiological": {
        const microbiologicalData = data as FormValues & {
          total_viable_counts_result?: string;
          total_viable_counts_remark?: string;
          coliforms_mpn_result?: string;
          coliforms_mpn_remark?: string;
          ecoli_mpn_result?: string;
          ecoli_mpn_remark?: string;
          faecal_coliforms_mpn_result?: string;
          faecal_coliforms_mpn_remark?: string;
        };

        ({ error: resultsError } = await supabase
          .from("microbiological_results")
          .insert([
            {
              certificate_id: savedCertificate.id,
              total_viable_counts_result:
                microbiologicalData.total_viable_counts_result || null,
              total_viable_counts_remark:
                microbiologicalData.total_viable_counts_remark || null,
              coliforms_mpn_result:
                microbiologicalData.coliforms_mpn_result || null,
              coliforms_mpn_remark:
                microbiologicalData.coliforms_mpn_remark || null,
              ecoli_mpn_result: microbiologicalData.ecoli_mpn_result || null,
              ecoli_mpn_remark: microbiologicalData.ecoli_mpn_remark || null,
              faecal_coliforms_mpn_result:
                microbiologicalData.faecal_coliforms_mpn_result || null,
              faecal_coliforms_mpn_remark:
                microbiologicalData.faecal_coliforms_mpn_remark || null,
            },
          ]));
        break;
      }

      case "effluent": {
        const effluentData = data as FormValues & {
          // Physical Parameters
          effluent_ph_result?: number;
          effluent_ph_remark?: string;
          effluent_temperature_result?: number;
          effluent_temperature_remark?: string;
          effluent_tss_result?: number;
          effluent_tss_remark?: string;
          effluent_tds_result?: number;
          effluent_tds_remark?: string;
          effluent_color_result?: string;
          effluent_color_remark?: string;
          // Chemical Parameters
          effluent_bod_result?: number;
          effluent_bod_remark?: string;
          effluent_cod_result?: number;
          effluent_cod_remark?: string;
          effluent_total_nitrogen_result?: number;
          effluent_total_nitrogen_remark?: string;
          effluent_total_phosphorus_result?: number;
          effluent_total_phosphorus_remark?: string;
          effluent_oil_grease_result?: number;
          effluent_oil_grease_remark?: string;
          effluent_detergents_result?: number;
          effluent_detergents_remark?: string;
          effluent_chloride_result?: number;
          effluent_chloride_remark?: string;
          effluent_fluoride_result?: number;
          effluent_fluoride_remark?: string;
          effluent_sulphide_result?: number;
          effluent_sulphide_remark?: string;
          effluent_phenols_result?: number;
          effluent_phenols_remark?: string;
          effluent_hexane_veg_result?: number;
          effluent_hexane_veg_remark?: string;
          effluent_hexane_mineral_result?: number;
          effluent_hexane_mineral_remark?: string;
          // Heavy Metals
          effluent_arsenic_result?: number;
          effluent_arsenic_remark?: string;
          effluent_boron_result?: number;
          effluent_boron_remark?: string;
          effluent_cadmium_result?: number;
          effluent_cadmium_remark?: string;
          effluent_chromium_vi_result?: number;
          effluent_chromium_vi_remark?: string;
          effluent_copper_result?: number;
          effluent_copper_remark?: string;
          effluent_iron_result?: number;
          effluent_iron_remark?: string;
          effluent_lead_result?: number;
          effluent_lead_remark?: string;
          effluent_manganese_result?: number;
          effluent_manganese_remark?: string;
          effluent_mercury_result?: number;
          effluent_mercury_remark?: string;
          effluent_nickel_result?: number;
          effluent_nickel_remark?: string;
          effluent_selenium_result?: number;
          effluent_selenium_remark?: string;
          effluent_zinc_result?: number;
          effluent_zinc_remark?: string;
          // Organic Compounds
          effluent_111_trichloroethane_result?: number;
          effluent_111_trichloroethane_remark?: string;
          effluent_112_trichloroethane_result?: number;
          effluent_112_trichloroethane_remark?: string;
          effluent_11_dichloroethylene_result?: number;
          effluent_11_dichloroethylene_remark?: string;
          effluent_12_dichloroethane_result?: number;
          effluent_12_dichloroethane_remark?: string;
          effluent_13_dichloropropene_result?: number;
          effluent_13_dichloropropene_remark?: string;
          effluent_benzene_result?: number;
          effluent_benzene_remark?: string;
          effluent_carbon_tetrachloride_result?: number;
          effluent_carbon_tetrachloride_remark?: string;
          effluent_cis_12_dichloroethylene_result?: number;
          effluent_cis_12_dichloroethylene_remark?: string;
          effluent_dichloromethane_result?: number;
          effluent_dichloromethane_remark?: string;
          effluent_simazine_result?: number;
          effluent_simazine_remark?: string;
          effluent_tetrachloroethylene_result?: number;
          effluent_tetrachloroethylene_remark?: string;
          effluent_thiobencarb_result?: number;
          effluent_thiobencarb_remark?: string;
          effluent_thiram_result?: number;
          effluent_thiram_remark?: string;
          effluent_trichloroethylene_result?: number;
          effluent_trichloroethylene_remark?: string;
          // Microbiological Parameters
          effluent_ecoli_result?: string;
          effluent_ecoli_remark?: string;
          effluent_total_coliforms_result?: string;
          effluent_total_coliforms_remark?: string;
        };

        ({ error: resultsError } = await supabase
          .from("effluent_results")
          .insert([
            {
              certificate_id: savedCertificate.id,
              // Physical Parameters
              effluent_ph_result: effluentData.effluent_ph_result || null,
              effluent_ph_remark: effluentData.effluent_ph_remark || null,
              effluent_temperature_result:
                effluentData.effluent_temperature_result || null,
              effluent_temperature_remark:
                effluentData.effluent_temperature_remark || null,
              effluent_tss_result: effluentData.effluent_tss_result || null,
              effluent_tss_remark: effluentData.effluent_tss_remark || null,
              effluent_tds_result: effluentData.effluent_tds_result || null,
              effluent_tds_remark: effluentData.effluent_tds_remark || null,
              effluent_color_result: effluentData.effluent_color_result || null,
              effluent_color_remark: effluentData.effluent_color_remark || null,
              // Chemical Parameters
              effluent_bod_result: effluentData.effluent_bod_result || null,
              effluent_bod_remark: effluentData.effluent_bod_remark || null,
              effluent_cod_result: effluentData.effluent_cod_result || null,
              effluent_cod_remark: effluentData.effluent_cod_remark || null,
              effluent_total_nitrogen_result:
                effluentData.effluent_total_nitrogen_result || null,
              effluent_total_nitrogen_remark:
                effluentData.effluent_total_nitrogen_remark || null,
              effluent_total_phosphorus_result:
                effluentData.effluent_total_phosphorus_result || null,
              effluent_total_phosphorus_remark:
                effluentData.effluent_total_phosphorus_remark || null,
              effluent_oil_grease_result:
                effluentData.effluent_oil_grease_result || null,
              effluent_oil_grease_remark:
                effluentData.effluent_oil_grease_remark || null,
              effluent_detergents_result:
                effluentData.effluent_detergents_result || null,
              effluent_detergents_remark:
                effluentData.effluent_detergents_remark || null,
              effluent_chloride_result:
                effluentData.effluent_chloride_result || null,
              effluent_chloride_remark:
                effluentData.effluent_chloride_remark || null,
              effluent_fluoride_result:
                effluentData.effluent_fluoride_result || null,
              effluent_fluoride_remark:
                effluentData.effluent_fluoride_remark || null,
              effluent_sulphide_result:
                effluentData.effluent_sulphide_result || null,
              effluent_sulphide_remark:
                effluentData.effluent_sulphide_remark || null,
              effluent_phenols_result:
                effluentData.effluent_phenols_result || null,
              effluent_phenols_remark:
                effluentData.effluent_phenols_remark || null,
              effluent_hexane_veg_result:
                effluentData.effluent_hexane_veg_result || null,
              effluent_hexane_veg_remark:
                effluentData.effluent_hexane_veg_remark || null,
              effluent_hexane_mineral_result:
                effluentData.effluent_hexane_mineral_result || null,
              effluent_hexane_mineral_remark:
                effluentData.effluent_hexane_mineral_remark || null,
              // Heavy Metals
              effluent_arsenic_result:
                effluentData.effluent_arsenic_result || null,
              effluent_arsenic_remark:
                effluentData.effluent_arsenic_remark || null,
              effluent_boron_result: effluentData.effluent_boron_result || null,
              effluent_boron_remark: effluentData.effluent_boron_remark || null,
              effluent_cadmium_result:
                effluentData.effluent_cadmium_result || null,
              effluent_cadmium_remark:
                effluentData.effluent_cadmium_remark || null,
              effluent_chromium_vi_result:
                effluentData.effluent_chromium_vi_result || null,
              effluent_chromium_vi_remark:
                effluentData.effluent_chromium_vi_remark || null,
              effluent_copper_result:
                effluentData.effluent_copper_result || null,
              effluent_copper_remark:
                effluentData.effluent_copper_remark || null,
              effluent_iron_result: effluentData.effluent_iron_result || null,
              effluent_iron_remark: effluentData.effluent_iron_remark || null,
              effluent_lead_result: effluentData.effluent_lead_result || null,
              effluent_lead_remark: effluentData.effluent_lead_remark || null,
              effluent_manganese_result:
                effluentData.effluent_manganese_result || null,
              effluent_manganese_remark:
                effluentData.effluent_manganese_remark || null,
              effluent_mercury_result:
                effluentData.effluent_mercury_result || null,
              effluent_mercury_remark:
                effluentData.effluent_mercury_remark || null,
              effluent_nickel_result:
                effluentData.effluent_nickel_result || null,
              effluent_nickel_remark:
                effluentData.effluent_nickel_remark || null,
              effluent_selenium_result:
                effluentData.effluent_selenium_result || null,
              effluent_selenium_remark:
                effluentData.effluent_selenium_remark || null,
              effluent_zinc_result: effluentData.effluent_zinc_result || null,
              effluent_zinc_remark: effluentData.effluent_zinc_remark || null,
              // Organic Compounds
              effluent_111_trichloroethane_result:
                effluentData.effluent_111_trichloroethane_result || null,
              effluent_111_trichloroethane_remark:
                effluentData.effluent_111_trichloroethane_remark || null,
              effluent_112_trichloroethane_result:
                effluentData.effluent_112_trichloroethane_result || null,
              effluent_112_trichloroethane_remark:
                effluentData.effluent_112_trichloroethane_remark || null,
              effluent_11_dichloroethylene_result:
                effluentData.effluent_11_dichloroethylene_result || null,
              effluent_11_dichloroethylene_remark:
                effluentData.effluent_11_dichloroethylene_remark || null,
              effluent_12_dichloroethane_result:
                effluentData.effluent_12_dichloroethane_result || null,
              effluent_12_dichloroethane_remark:
                effluentData.effluent_12_dichloroethane_remark || null,
              effluent_13_dichloropropene_result:
                effluentData.effluent_13_dichloropropene_result || null,
              effluent_13_dichloropropene_remark:
                effluentData.effluent_13_dichloropropene_remark || null,
              effluent_benzene_result:
                effluentData.effluent_benzene_result || null,
              effluent_benzene_remark:
                effluentData.effluent_benzene_remark || null,
              effluent_carbon_tetrachloride_result:
                effluentData.effluent_carbon_tetrachloride_result || null,
              effluent_carbon_tetrachloride_remark:
                effluentData.effluent_carbon_tetrachloride_remark || null,
              effluent_cis_12_dichloroethylene_result:
                effluentData.effluent_cis_12_dichloroethylene_result || null,
              effluent_cis_12_dichloroethylene_remark:
                effluentData.effluent_cis_12_dichloroethylene_remark || null,
              effluent_dichloromethane_result:
                effluentData.effluent_dichloromethane_result || null,
              effluent_dichloromethane_remark:
                effluentData.effluent_dichloromethane_remark || null,
              effluent_simazine_result:
                effluentData.effluent_simazine_result || null,
              effluent_simazine_remark:
                effluentData.effluent_simazine_remark || null,
              effluent_tetrachloroethylene_result:
                effluentData.effluent_tetrachloroethylene_result || null,
              effluent_tetrachloroethylene_remark:
                effluentData.effluent_tetrachloroethylene_remark || null,
              effluent_thiobencarb_result:
                effluentData.effluent_thiobencarb_result || null,
              effluent_thiobencarb_remark:
                effluentData.effluent_thiobencarb_remark || null,
              effluent_thiram_result:
                effluentData.effluent_thiram_result || null,
              effluent_thiram_remark:
                effluentData.effluent_thiram_remark || null,
              effluent_trichloroethylene_result:
                effluentData.effluent_trichloroethylene_result || null,
              effluent_trichloroethylene_remark:
                effluentData.effluent_trichloroethylene_remark || null,
              // Microbiological Parameters
              effluent_ecoli_result: effluentData.effluent_ecoli_result || null,
              effluent_ecoli_remark: effluentData.effluent_ecoli_remark || null,
              effluent_total_coliforms_result:
                effluentData.effluent_total_coliforms_result || null,
              effluent_total_coliforms_remark:
                effluentData.effluent_total_coliforms_remark || null,
            },
          ]));
        break;
      }

      case "irrigation": {
        const irrigationData = data as FormValues & {
          irrigation_ph_result?: number;
          irrigation_ph_remark?: string;
          irrigation_aluminium_result?: number;
          irrigation_aluminium_remark?: string;
          irrigation_arsenic_result?: number;
          irrigation_arsenic_remark?: string;
          irrigation_boron_result?: number;
          irrigation_boron_remark?: string;
          irrigation_cadmium_result?: number;
          irrigation_cadmium_remark?: string;
          irrigation_chloride_result?: number;
          irrigation_chloride_remark?: string;
          irrigation_chromium_result?: number;
          irrigation_chromium_remark?: string;
          irrigation_cobalt_result?: number;
          irrigation_cobalt_remark?: string;
          irrigation_copper_result?: number;
          irrigation_copper_remark?: string;
          irrigation_ecoli_result?: string;
          irrigation_ecoli_remark?: string;
          irrigation_fluoride_result?: number;
          irrigation_fluoride_remark?: string;
          irrigation_iron_result?: number;
          irrigation_iron_remark?: string;
          irrigation_lead_result?: number;
          irrigation_lead_remark?: string;
          irrigation_selenium_result?: number;
          irrigation_selenium_remark?: string;
          irrigation_sar_result?: number;
          irrigation_sar_remark?: string;
          irrigation_tds_result?: number;
          irrigation_tds_remark?: string;
          irrigation_zinc_result?: number;
          irrigation_zinc_remark?: string;
        };

        ({ error: resultsError } = await supabase
          .from("irrigation_results")
          .insert([
            {
              certificate_id: savedCertificate.id,
              irrigation_ph_result: irrigationData.irrigation_ph_result || null,
              irrigation_ph_remark: irrigationData.irrigation_ph_remark || null,
              irrigation_aluminium_result:
                irrigationData.irrigation_aluminium_result || null,
              irrigation_aluminium_remark:
                irrigationData.irrigation_aluminium_remark || null,
              irrigation_arsenic_result:
                irrigationData.irrigation_arsenic_result || null,
              irrigation_arsenic_remark:
                irrigationData.irrigation_arsenic_remark || null,
              irrigation_boron_result:
                irrigationData.irrigation_boron_result || null,
              irrigation_boron_remark:
                irrigationData.irrigation_boron_remark || null,
              irrigation_cadmium_result:
                irrigationData.irrigation_cadmium_result || null,
              irrigation_cadmium_remark:
                irrigationData.irrigation_cadmium_remark || null,
              irrigation_chloride_result:
                irrigationData.irrigation_chloride_result || null,
              irrigation_chloride_remark:
                irrigationData.irrigation_chloride_remark || null,
              irrigation_chromium_result:
                irrigationData.irrigation_chromium_result || null,
              irrigation_chromium_remark:
                irrigationData.irrigation_chromium_remark || null,
              irrigation_cobalt_result:
                irrigationData.irrigation_cobalt_result || null,
              irrigation_cobalt_remark:
                irrigationData.irrigation_cobalt_remark || null,
              irrigation_copper_result:
                irrigationData.irrigation_copper_result || null,
              irrigation_copper_remark:
                irrigationData.irrigation_copper_remark || null,
              irrigation_ecoli_result:
                irrigationData.irrigation_ecoli_result || null,
              irrigation_ecoli_remark:
                irrigationData.irrigation_ecoli_remark || null,
              irrigation_fluoride_result:
                irrigationData.irrigation_fluoride_result || null,
              irrigation_fluoride_remark:
                irrigationData.irrigation_fluoride_remark || null,
              irrigation_iron_result:
                irrigationData.irrigation_iron_result || null,
              irrigation_iron_remark:
                irrigationData.irrigation_iron_remark || null,
              irrigation_lead_result:
                irrigationData.irrigation_lead_result || null,
              irrigation_lead_remark:
                irrigationData.irrigation_lead_remark || null,
              irrigation_selenium_result:
                irrigationData.irrigation_selenium_result || null,
              irrigation_selenium_remark:
                irrigationData.irrigation_selenium_remark || null,
              irrigation_sar_result:
                irrigationData.irrigation_sar_result || null,
              irrigation_sar_remark:
                irrigationData.irrigation_sar_remark || null,
              irrigation_tds_result:
                irrigationData.irrigation_tds_result || null,
              irrigation_tds_remark:
                irrigationData.irrigation_tds_remark || null,
              irrigation_zinc_result:
                irrigationData.irrigation_zinc_result || null,
              irrigation_zinc_remark:
                irrigationData.irrigation_zinc_remark || null,
            },
          ]));
        break;
      }

      case "borehole": {
        const boreholeData = data as FormValues & {
          // Physical Tests
          borehole_ph_result?: number;
          borehole_ph_remark?: string;
          borehole_turbidity_result?: number;
          borehole_turbidity_remark?: string;
          borehole_color_result?: string;
          borehole_color_remark?: string;
          borehole_tss_result?: string;
          borehole_tss_remark?: string;
          borehole_tds_result?: number;
          borehole_tds_remark?: string;
          borehole_conductivity_result?: number;
          borehole_conductivity_remark?: string;
          // Chemical Tests (Anions)
          borehole_fluoride_result?: number;
          borehole_fluoride_remark?: string;
          // Chemical Tests (Cations)
          borehole_calcium_result?: string;
          borehole_calcium_remark?: string;
          borehole_magnesium_result?: string;
          borehole_magnesium_remark?: string;
          borehole_iron_result?: number;
          borehole_iron_remark?: string;
          borehole_manganese_result?: number;
          borehole_manganese_remark?: string;
          // Other Parameters
          borehole_total_hardness_result?: string;
          borehole_total_hardness_remark?: string;
          borehole_calcium_hardness_result?: string;
          borehole_calcium_hardness_remark?: string;
          borehole_magnesium_hardness_result?: string;
          borehole_magnesium_hardness_remark?: string;
        };

        ({ error: resultsError } = await supabase
          .from("borehole_results")
          .insert([
            {
              certificate_id: savedCertificate.id,
              // Physical Tests
              borehole_ph_result: boreholeData.borehole_ph_result || null,
              borehole_ph_remark: boreholeData.borehole_ph_remark || null,
              borehole_turbidity_result:
                boreholeData.borehole_turbidity_result || null,
              borehole_turbidity_remark:
                boreholeData.borehole_turbidity_remark || null,
              borehole_color_result: boreholeData.borehole_color_result || null,
              borehole_color_remark: boreholeData.borehole_color_remark || null,
              borehole_tss_result: boreholeData.borehole_tss_result || null,
              borehole_tss_remark: boreholeData.borehole_tss_remark || null,
              borehole_tds_result: boreholeData.borehole_tds_result || null,
              borehole_tds_remark: boreholeData.borehole_tds_remark || null,
              borehole_conductivity_result:
                boreholeData.borehole_conductivity_result || null,
              borehole_conductivity_remark:
                boreholeData.borehole_conductivity_remark || null,
              // Chemical Tests (Anions)
              borehole_fluoride_result:
                boreholeData.borehole_fluoride_result || null,
              borehole_fluoride_remark:
                boreholeData.borehole_fluoride_remark || null,
              // Chemical Tests (Cations)
              borehole_calcium_result:
                boreholeData.borehole_calcium_result || null,
              borehole_calcium_remark:
                boreholeData.borehole_calcium_remark || null,
              borehole_magnesium_result:
                boreholeData.borehole_magnesium_result || null,
              borehole_magnesium_remark:
                boreholeData.borehole_magnesium_remark || null,
              borehole_iron_result: boreholeData.borehole_iron_result || null,
              borehole_iron_remark: boreholeData.borehole_iron_remark || null,
              borehole_manganese_result:
                boreholeData.borehole_manganese_result || null,
              borehole_manganese_remark:
                boreholeData.borehole_manganese_remark || null,
              // Other Parameters
              borehole_total_hardness_result:
                boreholeData.borehole_total_hardness_result || null,
              borehole_total_hardness_remark:
                boreholeData.borehole_total_hardness_remark || null,
              borehole_calcium_hardness_result:
                boreholeData.borehole_calcium_hardness_result || null,
              borehole_calcium_hardness_remark:
                boreholeData.borehole_calcium_hardness_remark || null,
              borehole_magnesium_hardness_result:
                boreholeData.borehole_magnesium_hardness_result || null,
              borehole_magnesium_hardness_remark:
                boreholeData.borehole_magnesium_hardness_remark || null,
            },
          ]));
        break;
      }

      default:
        throw new Error(`Invalid certificate type: ${data.certificate_type}`);
    }

    if (resultsError) {
      // If results save fails, delete the certificate
      await supabase
        .from("certificates")
        .delete()
        .eq("id", savedCertificate.id);

      throw new Error(`Failed to save results: ${resultsError.message}`);
    }

    return {
      error: null,
      data: savedCertificate,
    };
  } catch (error) {
    console.error("Error in createCertificate:", error);
    return {
      error: "An unexpected error occurred. Please try again.",
      data: null,
    };
  }
}
