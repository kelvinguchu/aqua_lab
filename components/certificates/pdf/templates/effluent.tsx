"use client";

import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "../shared/styles";
import { Header } from "../shared/header";
import { Footer } from "../shared/footer";
import { DateSection } from "../shared/date-section";
import {
  EffluentPDFProps,
  TestCategory,
  EffluentResults,
} from "../shared/types";

const EFFLUENT_LEGENDS = [
  "NS: Not Set Standard",
  "ND: Not Detected",
  "N/A: Not Applicable",
  "NEMA: National Environment Management Authority",
];

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Parameter</Text>
    <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Method</Text>
    <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Unit</Text>
    <Text style={[styles.tableHeaderCell, { flex: 1 }]}>NEMA Limit</Text>
    <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Result</Text>
    <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Remark</Text>
  </View>
);

const TestCategorySection = ({
  title,
  parameters,
  certificate,
  results,
}: TestCategory<EffluentResults> & EffluentPDFProps) => {
  // Filter out parameters with empty results
  const nonEmptyParameters = parameters.filter(
    (param) =>
      results[param.resultKey] !== null && results[param.resultKey] !== ""
  );

  if (nonEmptyParameters.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.table}>
        <TableHeader />
        {nonEmptyParameters.map((param, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>{param.name}</Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {param.method}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{param.unit}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {param.standard}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {results[param.resultKey]}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {results[param.remarkKey]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export function EffluentPDF({ certificate, results }: EffluentPDFProps) {
  const dateInfo = [
    { label: "Date of Report", value: certificate.date_of_report },
    { label: "Date of Report Issue", value: certificate.date_of_report_issue },
    {
      label: "Description of Sample",
      value: certificate.description_of_sample,
    },
    { label: "Sample Source", value: certificate.sample_source },
    { label: "Submitted By", value: certificate.submitted_by },
    { label: "Customer Contact", value: certificate.customer_contact },
    { label: "Sampled By", value: certificate.sampled_by },
    { label: "Date of Sampling", value: certificate.date_of_sampling },
    { label: "Date Sample Received", value: certificate.date_sample_received },
    { label: "Date of Analysis", value: certificate.date_of_analysis },
  ];

  const physicalParameters: TestCategory<EffluentResults> = {
    title: "Physical Parameters",
    parameters: [
      {
        name: "pH",
        method: "APHA 4500-H+B",
        unit: "pH units",
        standard: "6.5-8.5",
        resultKey: "effluent_ph_result",
        remarkKey: "effluent_ph_remark",
      },
      {
        name: "Temperature",
        method: "APHA 2550-B",
        unit: "°C",
        standard: "±3",
        resultKey: "effluent_temperature_result",
        remarkKey: "effluent_temperature_remark",
      },
      {
        name: "Total Suspended Solids",
        method: "APHA 2540-D",
        unit: "mg/L",
        standard: "30",
        resultKey: "effluent_tss_result",
        remarkKey: "effluent_tss_remark",
      },
      {
        name: "Total Dissolved Solids",
        method: "APHA 2540-C",
        unit: "mg/L",
        standard: "1200",
        resultKey: "effluent_tds_result",
        remarkKey: "effluent_tds_remark",
      },
      {
        name: "Color",
        method: "APHA 2120-C",
        unit: "TCU",
        standard: "15",
        resultKey: "effluent_color_result",
        remarkKey: "effluent_color_remark",
      },
    ],
  };

  const chemicalParameters: TestCategory<EffluentResults> = {
    title: "Chemical Parameters",
    parameters: [
      {
        name: "BOD₅",
        method: "APHA 5210-B",
        unit: "mg/L",
        standard: "30",
        resultKey: "effluent_bod_result",
        remarkKey: "effluent_bod_remark",
      },
      {
        name: "COD",
        method: "APHA 5220-B",
        unit: "mg/L",
        standard: "50",
        resultKey: "effluent_cod_result",
        remarkKey: "effluent_cod_remark",
      },
      {
        name: "Total Nitrogen",
        method: "APHA 4500-N",
        unit: "mg/L",
        standard: "10",
        resultKey: "effluent_total_nitrogen_result",
        remarkKey: "effluent_total_nitrogen_remark",
      },
      {
        name: "Total Phosphorus",
        method: "APHA 4500-P",
        unit: "mg/L",
        standard: "2",
        resultKey: "effluent_total_phosphorus_result",
        remarkKey: "effluent_total_phosphorus_remark",
      },
      {
        name: "Oil & Grease",
        method: "APHA 5520-B",
        unit: "mg/L",
        standard: "10",
        resultKey: "effluent_oil_grease_result",
        remarkKey: "effluent_oil_grease_remark",
      },
      {
        name: "Detergents",
        method: "APHA 5540-C",
        unit: "mg/L",
        standard: "15",
        resultKey: "effluent_detergents_result",
        remarkKey: "effluent_detergents_remark",
      },
      {
        name: "Chloride",
        method: "APHA 4500-Cl-B",
        unit: "mg/L",
        standard: "250",
        resultKey: "effluent_chloride_result",
        remarkKey: "effluent_chloride_remark",
      },
      {
        name: "Fluoride",
        method: "APHA 4500-F-D",
        unit: "mg/L",
        standard: "1.5",
        resultKey: "effluent_fluoride_result",
        remarkKey: "effluent_fluoride_remark",
      },
      {
        name: "Sulphide",
        method: "APHA 4500-S2-D",
        unit: "mg/L",
        standard: "0.1",
        resultKey: "effluent_sulphide_result",
        remarkKey: "effluent_sulphide_remark",
      },
      {
        name: "Phenols",
        method: "APHA 5530-D",
        unit: "mg/L",
        standard: "0.001",
        resultKey: "effluent_phenols_result",
        remarkKey: "effluent_phenols_remark",
      },
      {
        name: "Hexane Extractable Matter (Vegetable)",
        method: "APHA 5520-B",
        unit: "mg/L",
        standard: "30",
        resultKey: "effluent_hexane_veg_result",
        remarkKey: "effluent_hexane_veg_remark",
      },
      {
        name: "Hexane Extractable Matter (Mineral)",
        method: "APHA 5520-B",
        unit: "mg/L",
        standard: "5",
        resultKey: "effluent_hexane_mineral_result",
        remarkKey: "effluent_hexane_mineral_remark",
      },
    ],
  };

  const heavyMetals: TestCategory<EffluentResults> = {
    title: "Heavy Metals and Other Elements",
    parameters: [
      {
        name: "Arsenic",
        method: "APHA 3114-B",
        unit: "mg/L",
        standard: "0.02",
        resultKey: "effluent_arsenic_result",
        remarkKey: "effluent_arsenic_remark",
      },
      {
        name: "Boron",
        method: "APHA 4500-B",
        unit: "mg/L",
        standard: "1.0",
        resultKey: "effluent_boron_result",
        remarkKey: "effluent_boron_remark",
      },
      {
        name: "Cadmium",
        method: "APHA 3111-B",
        unit: "mg/L",
        standard: "0.01",
        resultKey: "effluent_cadmium_result",
        remarkKey: "effluent_cadmium_remark",
      },
      {
        name: "Chromium VI",
        method: "APHA 3111-B",
        unit: "mg/L",
        standard: "0.05",
        resultKey: "effluent_chromium_vi_result",
        remarkKey: "effluent_chromium_vi_remark",
      },
      {
        name: "Copper",
        method: "APHA 3111-B",
        unit: "mg/L",
        standard: "1.0",
        resultKey: "effluent_copper_result",
        remarkKey: "effluent_copper_remark",
      },
      {
        name: "Iron",
        method: "APHA 3111-B",
        unit: "mg/L",
        standard: "2.0",
        resultKey: "effluent_iron_result",
        remarkKey: "effluent_iron_remark",
      },
      {
        name: "Lead",
        method: "APHA 3111-B",
        unit: "mg/L",
        standard: "0.01",
        resultKey: "effluent_lead_result",
        remarkKey: "effluent_lead_remark",
      },
      {
        name: "Manganese",
        method: "APHA 3111-B",
        unit: "mg/L",
        standard: "0.1",
        resultKey: "effluent_manganese_result",
        remarkKey: "effluent_manganese_remark",
      },
      {
        name: "Mercury",
        method: "APHA 3112-B",
        unit: "mg/L",
        standard: "0.005",
        resultKey: "effluent_mercury_result",
        remarkKey: "effluent_mercury_remark",
      },
      {
        name: "Nickel",
        method: "APHA 3111-B",
        unit: "mg/L",
        standard: "0.3",
        resultKey: "effluent_nickel_result",
        remarkKey: "effluent_nickel_remark",
      },
      {
        name: "Selenium",
        method: "APHA 3114-B",
        unit: "mg/L",
        standard: "0.02",
        resultKey: "effluent_selenium_result",
        remarkKey: "effluent_selenium_remark",
      },
      {
        name: "Zinc",
        method: "APHA 3111-B",
        unit: "mg/L",
        standard: "0.5",
        resultKey: "effluent_zinc_result",
        remarkKey: "effluent_zinc_remark",
      },
    ],
  };

  const organicCompounds: TestCategory<EffluentResults> = {
    title: "Organic Compounds",
    parameters: [
      {
        name: "1,1,1-Trichloroethane",
        method: "APHA 6200-B",
        unit: "mg/L",
        standard: "3.0",
        resultKey: "effluent_111_trichloroethane_result",
        remarkKey: "effluent_111_trichloroethane_remark",
      },
      {
        name: "1,1,2-Trichloroethane",
        method: "APHA 6200-B",
        unit: "mg/L",
        standard: "0.06",
        resultKey: "effluent_112_trichloroethane_result",
        remarkKey: "effluent_112_trichloroethane_remark",
      },
      {
        name: "1,1-Dichloroethylene",
        method: "APHA 6200-B",
        unit: "mg/L",
        standard: "0.2",
        resultKey: "effluent_11_dichloroethylene_result",
        remarkKey: "effluent_11_dichloroethylene_remark",
      },
      {
        name: "1,2-Dichloroethane",
        method: "APHA 6200-B",
        unit: "mg/L",
        standard: "0.04",
        resultKey: "effluent_12_dichloroethane_result",
        remarkKey: "effluent_12_dichloroethane_remark",
      },
      {
        name: "1,3-Dichloropropene",
        method: "APHA 6200-B",
        unit: "mg/L",
        standard: "0.02",
        resultKey: "effluent_13_dichloropropene_result",
        remarkKey: "effluent_13_dichloropropene_remark",
      },
      {
        name: "Benzene",
        method: "APHA 6200-B",
        unit: "mg/L",
        standard: "0.01",
        resultKey: "effluent_benzene_result",
        remarkKey: "effluent_benzene_remark",
      },
      {
        name: "Carbon Tetrachloride",
        method: "APHA 6200-B",
        unit: "mg/L",
        standard: "0.02",
        resultKey: "effluent_carbon_tetrachloride_result",
        remarkKey: "effluent_carbon_tetrachloride_remark",
      },
      {
        name: "cis-1,2-Dichloroethylene",
        method: "APHA 6200-B",
        unit: "mg/L",
        standard: "0.4",
        resultKey: "effluent_cis_12_dichloroethylene_result",
        remarkKey: "effluent_cis_12_dichloroethylene_remark",
      },
      {
        name: "Dichloromethane",
        method: "APHA 6200-B",
        unit: "mg/L",
        standard: "0.06",
        resultKey: "effluent_dichloromethane_result",
        remarkKey: "effluent_dichloromethane_remark",
      },
      {
        name: "Simazine",
        method: "APHA 6410-B",
        unit: "mg/L",
        standard: "0.002",
        resultKey: "effluent_simazine_result",
        remarkKey: "effluent_simazine_remark",
      },
      {
        name: "Tetrachloroethylene",
        method: "APHA 6200-B",
        unit: "mg/L",
        standard: "0.04",
        resultKey: "effluent_tetrachloroethylene_result",
        remarkKey: "effluent_tetrachloroethylene_remark",
      },
      {
        name: "Thiobencarb",
        method: "APHA 6410-B",
        unit: "mg/L",
        standard: "0.002",
        resultKey: "effluent_thiobencarb_result",
        remarkKey: "effluent_thiobencarb_remark",
      },
      {
        name: "Thiram",
        method: "APHA 6410-B",
        unit: "mg/L",
        standard: "0.06",
        resultKey: "effluent_thiram_result",
        remarkKey: "effluent_thiram_remark",
      },
      {
        name: "Trichloroethylene",
        method: "APHA 6200-B",
        unit: "mg/L",
        standard: "0.07",
        resultKey: "effluent_trichloroethylene_result",
        remarkKey: "effluent_trichloroethylene_remark",
      },
    ],
  };

  const microbiologicalParameters: TestCategory<EffluentResults> = {
    title: "Microbiological Parameters",
    parameters: [
      {
        name: "E. coli",
        method: "APHA 9223-B",
        unit: "MPN/100ml",
        standard: "Nil",
        resultKey: "effluent_ecoli_result",
        remarkKey: "effluent_ecoli_remark",
      },
      {
        name: "Total Coliforms",
        method: "APHA 9223-B",
        unit: "MPN/100ml",
        standard: "30",
        resultKey: "effluent_total_coliforms_result",
        remarkKey: "effluent_total_coliforms_remark",
      },
    ],
  };

  return (
    <Document>
      <Page size='A4' style={styles.page} wrap>
        <Header />
        <DateSection dateInfo={dateInfo} />

        <TestCategorySection
          title={physicalParameters.title}
          parameters={physicalParameters.parameters}
          certificate={certificate}
          results={results}
        />

        <TestCategorySection
          title={chemicalParameters.title}
          parameters={chemicalParameters.parameters}
          certificate={certificate}
          results={results}
        />

        <TestCategorySection
          title={heavyMetals.title}
          parameters={heavyMetals.parameters}
          certificate={certificate}
          results={results}
        />

        <TestCategorySection
          title={organicCompounds.title}
          parameters={organicCompounds.parameters}
          certificate={certificate}
          results={results}
        />

        <TestCategorySection
          title={microbiologicalParameters.title}
          parameters={microbiologicalParameters.parameters}
          certificate={certificate}
          results={results}
        />

        {certificate.comments && (
          <View style={styles.commentsSection}>
            <Text style={styles.commentsLabel}>Comments:</Text>
            <Text style={styles.commentsText}>{certificate.comments}</Text>
          </View>
        )}

        <Footer legends={EFFLUENT_LEGENDS} certificateType='effluent' />
      </Page>
    </Document>
  );
}
