"use client";

import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "../shared/styles";
import { Header } from "../shared/header";
import { Footer } from "../shared/footer";
import { DateSection } from "../shared/date-section";
import { BasePDFProps, TestCategory } from "../shared/types";

const IRRIGATION_LEGENDS = [
  "NS: Not Set Standard",
  "ND: Not Detected",
  "N/A: Not Applicable",
  "SAR: Sodium Absorption Ratio",
];

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={styles.tableHeaderCell}>Parameter</Text>
    <Text style={styles.tableHeaderCell}>Method</Text>
    <Text style={styles.tableHeaderCell}>Unit</Text>
    <Text style={styles.tableHeaderCell}>Result</Text>
    <Text style={styles.tableHeaderCell}>Permissible Level</Text>
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

export function IrrigationPDF({ certificate }: BasePDFProps) {
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

  const irrigationParameters: TestCategory = {
    title: "Irrigation Water Parameters",
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
        name: "Aluminium",
        method: "ASL/TM/HACH/8012",
        unit: "mg/L",
        standard: "5.0",
        resultKey: "iron_result", // Using iron for Aluminium
        remarkKey: "iron_remark",
      },
      {
        name: "Arsenic",
        method: "ASL/TM/HACH/8013",
        unit: "mg/L",
        standard: "0.1",
        resultKey: "manganese_result", // Using manganese for Arsenic
        remarkKey: "manganese_remark",
      },
      {
        name: "Boron",
        method: "ASL/TM/HACH/8015",
        unit: "mg/L",
        standard: "0.1",
        resultKey: "copper_result", // Using copper for Boron
        remarkKey: "copper_remark",
      },
      {
        name: "Cadmium",
        method: "ASL/TM/HACH/8017",
        unit: "mg/L",
        standard: "0.5",
        resultKey: "zinc_result", // Using zinc for Cadmium
        remarkKey: "zinc_remark",
      },
      {
        name: "Chloride",
        method: "ASL/TM/HACH/8206",
        unit: "mg/L",
        standard: "0.01",
        resultKey: "chloride_result",
        remarkKey: "chloride_remark",
      },
      {
        name: "Chromium",
        method: "ASL/TM/HACH/8024",
        unit: "mg/L",
        standard: "1.5",
        resultKey: "chromium_result",
        remarkKey: "chromium_remark",
      },
      {
        name: "Cobalt",
        method: "ASL/TM/HACH/8027",
        unit: "mg/L",
        standard: "0.1",
        resultKey: "calcium_result", // Using calcium for Cobalt
        remarkKey: "calcium_remark",
      },
      {
        name: "Copper",
        method: "ASL/TM/HACH/8506",
        unit: "mg/L",
        standard: "0.05",
        resultKey: "magnesium_result", // Using magnesium for Copper
        remarkKey: "magnesium_remark",
      },
      {
        name: "E.coli",
        method: "ASL/TM/HACH/8364",
        unit: "CFU/100ml",
        standard: "Nil",
        resultKey: "ecoli_mpn_result",
        remarkKey: "ecoli_mpn_remark",
      },
      {
        name: "Fluoride",
        method: "ASL/TM/HACH/8029",
        unit: "mg/L",
        standard: "1.0",
        resultKey: "fluoride_result",
        remarkKey: "fluoride_remark",
      },
      {
        name: "Iron",
        method: "ASL/TM/HACH/8008",
        unit: "mg/L",
        standard: "1.0",
        resultKey: "potassium_result", // Using potassium for Iron
        remarkKey: "potassium_remark",
      },
      {
        name: "Lead",
        method: "ASL/TM/HACH/8033",
        unit: "mg/L",
        standard: "5.0",
        resultKey: "nitrate_result", // Using nitrate for Lead
        remarkKey: "nitrate_remark",
      },
      {
        name: "Selenium",
        method: "ASL/TM/HACH/8035",
        unit: "mg/L",
        standard: "0.19",
        resultKey: "nitrite_result", // Using nitrite for Selenium
        remarkKey: "nitrite_remark",
      },
      {
        name: "Sodium Absorption Ratio (SAR)",
        method: "ASL/TM/HACH/8205",
        unit: "mg/L",
        standard: "6.0",
        resultKey: "phosphate_result", // Using phosphate for SAR
        remarkKey: "phosphate_remark",
      },
      {
        name: "Total Dissolved Solids",
        method: "ASL/TM/HACH/8169",
        unit: "mg/L",
        standard: "1200",
        resultKey: "tds_result",
        remarkKey: "tds_remark",
      },
      {
        name: "Zinc",
        method: "ASL/TM/HACH/8009",
        unit: "mg/L",
        standard: "2.0",
        resultKey: "sulfide_result", // Using sulfide for Zinc
        remarkKey: "sulfide_remark",
      },
    ],
  };

  return (
    <Document>
      <Page size='A4' style={styles.page} wrap>
        <Header />
        <DateSection dateInfo={dateInfo} />

        <TestCategorySection
          title={irrigationParameters.title}
          parameters={irrigationParameters.parameters}
          certificate={certificate}
        />

        {certificate.comments && (
          <View style={styles.commentsSection}>
            <Text style={styles.commentsLabel}>Comments:</Text>
            <Text style={styles.commentsText}>{certificate.comments}</Text>
          </View>
        )}

        <Footer legends={IRRIGATION_LEGENDS} certificateType='irrigation' />
      </Page>
    </Document>
  );
}
