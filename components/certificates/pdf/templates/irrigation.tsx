"use client";

import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "../shared/styles";
import { Header } from "../shared/header";
import { Footer } from "../shared/footer";
import { DateSection } from "../shared/date-section";
import {
  IrrigationPDFProps,
  TestCategory,
  IrrigationResults,
} from "../shared/types";

const IRRIGATION_LEGENDS = [
  "NS: Not Set Standard",
  "ND: Not Detected",
  "N/A: Not Applicable",
  "KS EAS: Kenya Standard East African Standard",
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
  results,
}: TestCategory<IrrigationResults> & IrrigationPDFProps) => {
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
            <Text style={styles.tableCell}>{param.name}</Text>
            <Text style={styles.tableCell}>{param.method}</Text>
            <Text style={styles.tableCell}>{param.unit}</Text>
            <Text style={styles.tableCell}>{results[param.resultKey]}</Text>
            <Text style={styles.tableCell}>{param.standard}</Text>
            <Text style={styles.tableCell}>{results[param.remarkKey]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export function IrrigationPDF({ certificate, results }: IrrigationPDFProps) {
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

  const irrigationParameters: TestCategory<IrrigationResults> = {
    title: "Irrigation Water Parameters",
    parameters: [
      {
        name: "pH",
        method: "ASL/TM/HACH/8156",
        unit: "pH units",
        standard: "6.5-8.5",
        resultKey: "irrigation_ph_result",
        remarkKey: "irrigation_ph_remark",
      },
      {
        name: "Aluminium",
        method: "ASL/TM/HACH/8012",
        unit: "mg/L",
        standard: "5.0",
        resultKey: "irrigation_aluminium_result",
        remarkKey: "irrigation_aluminium_remark",
      },
      {
        name: "Arsenic",
        method: "ASL/TM/HACH/8013",
        unit: "mg/L",
        standard: "0.1",
        resultKey: "irrigation_arsenic_result",
        remarkKey: "irrigation_arsenic_remark",
      },
      {
        name: "Boron",
        method: "ASL/TM/HACH/8015",
        unit: "mg/L",
        standard: "0.75",
        resultKey: "irrigation_boron_result",
        remarkKey: "irrigation_boron_remark",
      },
      {
        name: "Cadmium",
        method: "ASL/TM/HACH/8017",
        unit: "mg/L",
        standard: "0.01",
        resultKey: "irrigation_cadmium_result",
        remarkKey: "irrigation_cadmium_remark",
      },
      {
        name: "Chloride",
        method: "ASL/TM/HACH/8113",
        unit: "mg/L",
        standard: "142",
        resultKey: "irrigation_chloride_result",
        remarkKey: "irrigation_chloride_remark",
      },
      {
        name: "Chromium",
        method: "ASL/TM/HACH/8024",
        unit: "mg/L",
        standard: "0.1",
        resultKey: "irrigation_chromium_result",
        remarkKey: "irrigation_chromium_remark",
      },
      {
        name: "Cobalt",
        method: "ASL/TM/HACH/8078",
        unit: "mg/L",
        standard: "0.05",
        resultKey: "irrigation_cobalt_result",
        remarkKey: "irrigation_cobalt_remark",
      },
      {
        name: "Copper",
        method: "ASL/TM/HACH/8506",
        unit: "mg/L",
        standard: "0.2",
        resultKey: "irrigation_copper_result",
        remarkKey: "irrigation_copper_remark",
      },
      {
        name: "E. coli",
        method: "ASL/TM/HACH/10029",
        unit: "CFU/100ml",
        standard: "1000",
        resultKey: "irrigation_ecoli_result",
        remarkKey: "irrigation_ecoli_remark",
      },
      {
        name: "Fluoride",
        method: "ASL/TM/HACH/8029",
        unit: "mg/L",
        standard: "1.0",
        resultKey: "irrigation_fluoride_result",
        remarkKey: "irrigation_fluoride_remark",
      },
      {
        name: "Iron",
        method: "ASL/TM/HACH/8008",
        unit: "mg/L",
        standard: "5.0",
        resultKey: "irrigation_iron_result",
        remarkKey: "irrigation_iron_remark",
      },
      {
        name: "Lead",
        method: "ASL/TM/HACH/8033",
        unit: "mg/L",
        standard: "5.0",
        resultKey: "irrigation_lead_result",
        remarkKey: "irrigation_lead_remark",
      },
      {
        name: "Selenium",
        method: "ASL/TM/HACH/8185",
        unit: "mg/L",
        standard: "0.02",
        resultKey: "irrigation_selenium_result",
        remarkKey: "irrigation_selenium_remark",
      },
      {
        name: "SAR",
        method: "ASL/TM/HACH/8213",
        unit: "meq/L",
        standard: "6.0",
        resultKey: "irrigation_sar_result",
        remarkKey: "irrigation_sar_remark",
      },
      {
        name: "Total Dissolved Solids",
        method: "ASL/TM/HACH/8169",
        unit: "mg/L",
        standard: "1200",
        resultKey: "irrigation_tds_result",
        remarkKey: "irrigation_tds_remark",
      },
      {
        name: "Zinc",
        method: "ASL/TM/HACH/8009",
        unit: "mg/L",
        standard: "2.0",
        resultKey: "irrigation_zinc_result",
        remarkKey: "irrigation_zinc_remark",
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
          results={results}
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
