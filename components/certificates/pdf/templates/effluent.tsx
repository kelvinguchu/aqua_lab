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
  "NEMA: National Environment Management Authority",
];

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={styles.tableHeaderCell}>Parameter</Text>
    <Text style={styles.tableHeaderCell}>Method</Text>
    <Text style={styles.tableHeaderCell}>Unit</Text>
    <Text style={styles.tableHeaderCell}>Result</Text>
    <Text style={styles.tableHeaderCell}>NEMA Standard</Text>
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

  const physicalTests: TestCategory = {
    title: "Physical Tests",
    parameters: [
      {
        name: "pH",
        method: "ASL/TM/HACH/8156",
        unit: "pH units",
        standard: "6.5-8.5",
        resultKey: "ph_result",
        remarkKey: "ph_remark",
      },
      {
        name: "Turbidity",
        method: "ASL/TM/HACH/8237",
        unit: "NTU",
        standard: "30",
        resultKey: "turbidity_result",
        remarkKey: "turbidity_remark",
      },
      {
        name: "Color",
        method: "ASL/TM/HACH/8025",
        unit: "Pt-Co",
        standard: "15",
        resultKey: "color_result",
        remarkKey: "color_remark",
      },
      {
        name: "Total Suspended Solids",
        method: "ASL/TM/HACH/8006",
        unit: "mg/L",
        standard: "30",
        resultKey: "tss_result",
        remarkKey: "tss_remark",
      },
      {
        name: "Total Dissolved Solids",
        method: "ASL/TM/HACH/8160",
        unit: "mg/L",
        standard: "1200",
        resultKey: "tds_result",
        remarkKey: "tds_remark",
      },
      {
        name: "Conductivity",
        method: "ASL/TM/HACH/8160",
        unit: "µS/cm",
        standard: "NS",
        resultKey: "conductivity_result",
        remarkKey: "conductivity_remark",
      },
    ],
  };

  const chemicalTests: TestCategory = {
    title: "Chemical Tests",
    parameters: [
      {
        name: "BOD₅",
        method: "ASL/TM/HACH/8043",
        unit: "mg/L",
        standard: "30",
        resultKey: "total_alkalinity_result", // Using total_alkalinity for BOD₅
        remarkKey: "total_alkalinity_remark",
      },
      {
        name: "COD",
        method: "ASL/TM/HACH/8000",
        unit: "mg/L",
        standard: "50",
        resultKey: "ph_alkalinity_result", // Using ph_alkalinity for COD
        remarkKey: "ph_alkalinity_remark",
      },
      {
        name: "Nitrate",
        method: "ASL/TM/HACH/8039",
        unit: "mg/L NO₃⁻",
        standard: "20",
        resultKey: "nitrate_result",
        remarkKey: "nitrate_remark",
      },
      {
        name: "Nitrite",
        method: "ASL/TM/HACH/8507",
        unit: "mg/L NO₂⁻",
        standard: "3",
        resultKey: "nitrite_result",
        remarkKey: "nitrite_remark",
      },
      {
        name: "Ammonia",
        method: "ASL/TM/HACH/8038",
        unit: "mg/L NH₃-N",
        standard: "10",
        resultKey: "ammonia_result",
        remarkKey: "ammonia_remark",
      },
      {
        name: "Phosphate",
        method: "ASL/TM/HACH/8048",
        unit: "mg/L PO₄³⁻",
        standard: "30",
        resultKey: "phosphate_result",
        remarkKey: "phosphate_remark",
      },
      {
        name: "Sulfide",
        method: "ASL/TM/HACH/8131",
        unit: "mg/L S²⁻",
        standard: "1.0",
        resultKey: "sulfide_result",
        remarkKey: "sulfide_remark",
      },
      {
        name: "Phenols",
        method: "ASL/TM/HACH/8047",
        unit: "mg/L",
        standard: "0.001",
        resultKey: "silica_result", // Using silica for Phenols
        remarkKey: "silica_remark",
      },
      {
        name: "Oil & Grease",
        method: "ASL/TM/HACH/10056",
        unit: "mg/L",
        standard: "10",
        resultKey: "free_chlorine_result", // Using free_chlorine for Oil & Grease
        remarkKey: "free_chlorine_remark",
      },
    ],
  };

  const heavyMetals: TestCategory = {
    title: "Heavy Metals",
    parameters: [
      {
        name: "Lead",
        method: "ASL/TM/HACH/8033",
        unit: "mg/L Pb",
        standard: "0.1",
        resultKey: "iron_result", // Using iron for Lead
        remarkKey: "iron_remark",
      },
      {
        name: "Zinc",
        method: "ASL/TM/HACH/8009",
        unit: "mg/L Zn",
        standard: "0.5",
        resultKey: "zinc_result",
        remarkKey: "zinc_remark",
      },
      {
        name: "Copper",
        method: "ASL/TM/HACH/8506",
        unit: "mg/L Cu",
        standard: "1.0",
        resultKey: "copper_result",
        remarkKey: "copper_remark",
      },
      {
        name: "Chromium",
        method: "ASL/TM/HACH/8024",
        unit: "mg/L Cr",
        standard: "0.1",
        resultKey: "chromium_result",
        remarkKey: "chromium_remark",
      },
      {
        name: "Cadmium",
        method: "ASL/TM/HACH/8017",
        unit: "mg/L Cd",
        standard: "0.01",
        resultKey: "manganese_result", // Using manganese for Cadmium
        remarkKey: "manganese_remark",
      },
    ],
  };

  return (
    <Document>
      <Page size='A4' style={styles.page} wrap>
        <Header />
        <DateSection dateInfo={dateInfo} />

        <TestCategorySection
          title={physicalTests.title}
          parameters={physicalTests.parameters}
          certificate={certificate}
        />
        <TestCategorySection
          title={chemicalTests.title}
          parameters={chemicalTests.parameters}
          certificate={certificate}
        />
        <TestCategorySection
          title={heavyMetals.title}
          parameters={heavyMetals.parameters}
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
