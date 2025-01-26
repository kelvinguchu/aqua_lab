"use client";

import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "../shared/styles";
import { Header } from "../shared/header";
import { Footer } from "../shared/footer";
import { DateSection } from "../shared/date-section";
import {
  BasePDFProps,
  DateInfo,
  TestParameter,
  TestCategory,
} from "../shared/types";

const EFFLUENT_LEGENDS = [
  "NS: Not Set Standard",
  "ND: Not Detected",
  "N/A: Not Applicable",
  "NEMA: National Environment Management Authority",
];

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={styles.tableHeaderCell}>Parameter</Text>
    <Text style={styles.tableHeaderCell}>Method</Text>
    <Text style={styles.tableHeaderCell}>Unit</Text>
    <Text style={styles.tableHeaderCell}>Result</Text>
    <Text style={styles.tableHeaderCell}>NEMA Limit</Text>
    <Text style={styles.tableHeaderCell}>Remark</Text>
  </View>
);

const TestCategorySection = ({
  title,
  parameters,
  certificate,
}: TestCategory & { certificate: BasePDFProps["certificate"] }) => {
  // Filter out parameters with empty results
  const nonEmptyParameters = parameters.filter(
    (param) =>
      certificate[param.resultKey] !== null &&
      certificate[param.resultKey] !== ""
  );

  if (nonEmptyParameters.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.table}>
        <TableHeader />
        {nonEmptyParameters.map((param, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{param.name}</Text>
            <Text style={styles.tableCell}>{param.method}</Text>
            <Text style={styles.tableCell}>{param.unit}</Text>
            <Text style={styles.tableCell}>{certificate[param.resultKey]}</Text>
            <Text style={styles.tableCell}>{param.standard}</Text>
            <Text style={styles.tableCell}>{certificate[param.remarkKey]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export function EffluentPDF({ certificate }: BasePDFProps) {
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

  const physicalParameters: TestCategory = {
    title: "Physical Parameters",
    parameters: [
      {
        name: "pH (Hydrogen ion activity - non marine)",
        method: "ASL/TM/HACH/8156",
        unit: "pH Units",
        standard: "6.5-8.5",
        resultKey: "effluent_ph_result",
        remarkKey: "effluent_ph_remark",
      },
      {
        name: "Temperature",
        method: "ASL/TM/HACH/8157",
        unit: "°C",
        standard: "± 3 of ambient",
        resultKey: "effluent_temperature_result",
        remarkKey: "effluent_temperature_remark",
      },
      {
        name: "Total Suspended Solids (TSS)",
        method: "ASL/TM/HACH/8006",
        unit: "mg/L",
        standard: "30",
        resultKey: "effluent_tss_result",
        remarkKey: "effluent_tss_remark",
      },
      {
        name: "Total Dissolved Solids (TDS)",
        method: "ASL/TM/HACH/8169",
        unit: "mg/L",
        standard: "1200",
        resultKey: "effluent_tds_result",
        remarkKey: "effluent_tds_remark",
      },
      {
        name: "Colour",
        method: "ASL/TM/HACH/8025",
        unit: "Hazen Units",
        standard: "15",
        resultKey: "effluent_color_result",
        remarkKey: "effluent_color_remark",
      },
    ],
  };

  const chemicalParameters: TestCategory = {
    title: "Chemical Parameters",
    parameters: [
      {
        name: "Biochemical Oxygen Demand (BOD)",
        method: "ASL/TM/HACH/8043",
        unit: "mg/L",
        standard: "30",
        resultKey: "effluent_bod_result",
        remarkKey: "effluent_bod_remark",
      },
      {
        name: "Chemical Oxygen Demand (COD)",
        method: "ASL/TM/HACH/8000",
        unit: "mg/L",
        standard: "50",
        resultKey: "effluent_cod_result",
        remarkKey: "effluent_cod_remark",
      },
      {
        name: "Total Nitrogen",
        method: "ASL/TM/HACH/10071",
        unit: "mg/L",
        standard: "2",
        resultKey: "effluent_total_nitrogen_result",
        remarkKey: "effluent_total_nitrogen_remark",
      },
      {
        name: "Total Phosphorus",
        method: "ASL/TM/HACH/8190",
        unit: "mg/L",
        standard: "2",
        resultKey: "effluent_total_phosphorus_result",
        remarkKey: "effluent_total_phosphorus_remark",
      },
      {
        name: "Oil and Grease",
        method: "ASL/TM/HACH/10056",
        unit: "mg/L",
        standard: "Nil",
        resultKey: "effluent_oil_grease_result",
        remarkKey: "effluent_oil_grease_remark",
      },
      {
        name: "Detergents",
        method: "ASL/TM/HACH/8028",
        unit: "mg/L",
        standard: "Nil",
        resultKey: "effluent_detergents_result",
        remarkKey: "effluent_detergents_remark",
      },
      {
        name: "Chloride",
        method: "ASL/TM/HACH/8206",
        unit: "mg/L",
        standard: "250",
        resultKey: "effluent_chloride_result",
        remarkKey: "effluent_chloride_remark",
      },
      {
        name: "Fluoride",
        method: "ASL/TM/HACH/8029",
        unit: "mg/L",
        standard: "1.5",
        resultKey: "effluent_fluoride_result",
        remarkKey: "effluent_fluoride_remark",
      },
      {
        name: "Sulphide",
        method: "ASL/TM/HACH/8131",
        unit: "mg/L",
        standard: "0.1",
        resultKey: "effluent_sulphide_result",
        remarkKey: "effluent_sulphide_remark",
      },
      {
        name: "Phenols",
        method: "ASL/TM/HACH/8047",
        unit: "mg/L",
        standard: "0.001",
        resultKey: "effluent_phenols_result",
        remarkKey: "effluent_phenols_remark",
      },
      {
        name: "n-Hexane extracts (animal and vegetable fats)",
        method: "ASL/TM/HACH/10056",
        unit: "mg/L",
        standard: "30",
        resultKey: "effluent_hexane_veg_result",
        remarkKey: "effluent_hexane_veg_remark",
      },
      {
        name: "n-Hexane extracts (mineral oil)",
        method: "ASL/TM/HACH/10056",
        unit: "mg/L",
        standard: "5",
        resultKey: "effluent_hexane_mineral_result",
        remarkKey: "effluent_hexane_mineral_remark",
      },
    ],
  };

  const heavyMetals: TestCategory = {
    title: "Heavy Metals and Other Elements",
    parameters: [
      {
        name: "Arsenic",
        method: "ASL/TM/HACH/8013",
        unit: "mg/L",
        standard: "0.02",
        resultKey: "effluent_arsenic_result",
        remarkKey: "effluent_arsenic_remark",
      },
      {
        name: "Boron",
        method: "ASL/TM/HACH/8015",
        unit: "mg/L",
        standard: "1.0",
        resultKey: "effluent_boron_result",
        remarkKey: "effluent_boron_remark",
      },
      {
        name: "Cadmium",
        method: "ASL/TM/HACH/8017",
        unit: "mg/L",
        standard: "0.01",
        resultKey: "effluent_cadmium_result",
        remarkKey: "effluent_cadmium_remark",
      },
      {
        name: "Chromium VI",
        method: "ASL/TM/HACH/8023",
        unit: "mg/L",
        standard: "0.05",
        resultKey: "effluent_chromium_vi_result",
        remarkKey: "effluent_chromium_vi_remark",
      },
      {
        name: "Copper",
        method: "ASL/TM/HACH/8506",
        unit: "mg/L",
        standard: "1.0",
        resultKey: "effluent_copper_result",
        remarkKey: "effluent_copper_remark",
      },
      {
        name: "Iron (Dissolved)",
        method: "ASL/TM/HACH/8008",
        unit: "mg/L",
        standard: "10",
        resultKey: "effluent_iron_result",
        remarkKey: "effluent_iron_remark",
      },
      {
        name: "Lead",
        method: "ASL/TM/HACH/8033",
        unit: "mg/L",
        standard: "0.01",
        resultKey: "effluent_lead_result",
        remarkKey: "effluent_lead_remark",
      },
      {
        name: "Manganese (Dissolved)",
        method: "ASL/TM/HACH/8034",
        unit: "mg/L",
        standard: "10",
        resultKey: "effluent_manganese_result",
        remarkKey: "effluent_manganese_remark",
      },
      {
        name: "Mercury (Total)",
        method: "ASL/TM/HACH/8035",
        unit: "mg/L",
        standard: "0.005",
        resultKey: "effluent_mercury_result",
        remarkKey: "effluent_mercury_remark",
      },
      {
        name: "Nickel (Total)",
        method: "ASL/TM/HACH/8037",
        unit: "mg/L",
        standard: "0.3",
        resultKey: "effluent_nickel_result",
        remarkKey: "effluent_nickel_remark",
      },
      {
        name: "Selenium",
        method: "ASL/TM/HACH/8039",
        unit: "mg/L",
        standard: "0.01",
        resultKey: "effluent_selenium_result",
        remarkKey: "effluent_selenium_remark",
      },
      {
        name: "Zinc",
        method: "ASL/TM/HACH/8009",
        unit: "mg/L",
        standard: "0.5",
        resultKey: "effluent_zinc_result",
        remarkKey: "effluent_zinc_remark",
      },
    ],
  };

  const organicCompounds: TestCategory = {
    title: "Organic Compounds",
    parameters: [
      {
        name: "1,1,1-trichloroethane",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "3",
        resultKey: "effluent_111_trichloroethane_result",
        remarkKey: "effluent_111_trichloroethane_remark",
      },
      {
        name: "1,1,2-trichloethane",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "0.06",
        resultKey: "effluent_112_trichloroethane_result",
        remarkKey: "effluent_112_trichloroethane_remark",
      },
      {
        name: "1,1-dichloroethylene",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "0.2",
        resultKey: "effluent_11_dichloroethylene_result",
        remarkKey: "effluent_11_dichloroethylene_remark",
      },
      {
        name: "1,2-dichloroethane",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "0.04",
        resultKey: "effluent_12_dichloroethane_result",
        remarkKey: "effluent_12_dichloroethane_remark",
      },
      {
        name: "1,3-dichloropropene",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "0.02",
        resultKey: "effluent_13_dichloropropene_result",
        remarkKey: "effluent_13_dichloropropene_remark",
      },
      {
        name: "Benzene",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "0.1",
        resultKey: "effluent_benzene_result",
        remarkKey: "effluent_benzene_remark",
      },
      {
        name: "Carbon tetrachloride",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "0.02",
        resultKey: "effluent_carbon_tetrachloride_result",
        remarkKey: "effluent_carbon_tetrachloride_remark",
      },
      {
        name: "cis-1,2-dichloroethylene",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "0.4",
        resultKey: "effluent_cis_12_dichloroethylene_result",
        remarkKey: "effluent_cis_12_dichloroethylene_remark",
      },
      {
        name: "Dichloromethane",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "0.2",
        resultKey: "effluent_dichloromethane_result",
        remarkKey: "effluent_dichloromethane_remark",
      },
      {
        name: "Simazine",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "0.03",
        resultKey: "effluent_simazine_result",
        remarkKey: "effluent_simazine_remark",
      },
      {
        name: "Tetrachloroethylene",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "0.1",
        resultKey: "effluent_tetrachloroethylene_result",
        remarkKey: "effluent_tetrachloroethylene_remark",
      },
      {
        name: "Thiobencarb",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "0.1",
        resultKey: "effluent_thiobencarb_result",
        remarkKey: "effluent_thiobencarb_remark",
      },
      {
        name: "Thiram",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "0.06",
        resultKey: "effluent_thiram_result",
        remarkKey: "effluent_thiram_remark",
      },
      {
        name: "Trichloroethylene",
        method: "ASL/TM/HACH/8010",
        unit: "mg/L",
        standard: "0.3",
        resultKey: "effluent_trichloroethylene_result",
        remarkKey: "effluent_trichloroethylene_remark",
      },
    ],
  };

  const microbiologicalParameters: TestCategory = {
    title: "Microbiological Parameters",
    parameters: [
      {
        name: "E.coli",
        method: "ASL/TM/HACH/8364",
        unit: "Counts/100mL",
        standard: "Nil",
        resultKey: "effluent_ecoli_result",
        remarkKey: "effluent_ecoli_remark",
      },
      {
        name: "Total Coliforms",
        method: "ASL/TM/HACH/8364",
        unit: "Counts/100mL",
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
        />

        <TestCategorySection
          title={chemicalParameters.title}
          parameters={chemicalParameters.parameters}
          certificate={certificate}
        />

        <TestCategorySection
          title={heavyMetals.title}
          parameters={heavyMetals.parameters}
          certificate={certificate}
        />

        <TestCategorySection
          title={organicCompounds.title}
          parameters={organicCompounds.parameters}
          certificate={certificate}
        />

        <TestCategorySection
          title={microbiologicalParameters.title}
          parameters={microbiologicalParameters.parameters}
          certificate={certificate}
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
