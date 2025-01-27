"use client";

import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "../shared/styles";
import { Header } from "../shared/header";
import { Footer } from "../shared/footer";
import { DateSection } from "../shared/date-section";
import {
  BoreholePDFProps,
  TestCategory,
  BoreholeResults,
} from "../shared/types";

const BOREHOLE_LEGENDS = [
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
    <Text style={styles.tableHeaderCell}>KS EAS 12:2018</Text>
    <Text style={styles.tableHeaderCell}>Remark</Text>
  </View>
);

const TestCategorySection = ({
  title,
  parameters,
  certificate,
  results,
}: TestCategory<BoreholeResults> & BoreholePDFProps) => {
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

export function BoreholePDF({ certificate, results }: BoreholePDFProps) {
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

  const physicalTests: TestCategory<BoreholeResults> = {
    title: "Physical Tests",
    parameters: [
      {
        name: "pH",
        method: "ASL/TM/HACH/8156",
        unit: "pH units",
        standard: "6.5-8.5",
        resultKey: "borehole_ph_result",
        remarkKey: "borehole_ph_remark",
      },
      {
        name: "Turbidity",
        method: "ASL/TM/HACH/8195",
        unit: "NTU",
        standard: "< 5.0",
        resultKey: "borehole_turbidity_result",
        remarkKey: "borehole_turbidity_remark",
      },
      {
        name: "Color",
        method: "ASL/TM/HACH/8025",
        unit: "Pt. Co. APHA",
        standard: "15 TCU",
        resultKey: "borehole_color_result",
        remarkKey: "borehole_color_remark",
      },
      {
        name: "Total Suspended Solids",
        method: "ASL/TM/HACH/8006",
        unit: "mg/L",
        standard: "NIL",
        resultKey: "borehole_tss_result",
        remarkKey: "borehole_tss_remark",
      },
      {
        name: "Total Dissolved Solids",
        method: "ASL/TM/HACH/8169",
        unit: "mg/L",
        standard: "1000 Max.",
        resultKey: "borehole_tds_result",
        remarkKey: "borehole_tds_remark",
      },
      {
        name: "Conductivity",
        method: "ASL/TM/HACH/8169",
        unit: "µS/cm",
        standard: "1500",
        resultKey: "borehole_conductivity_result",
        remarkKey: "borehole_conductivity_remark",
      },
    ],
  };

  const chemicalTestsAnions: TestCategory<BoreholeResults> = {
    title: "Chemical Tests (Anions)",
    parameters: [
      {
        name: "Fluoride",
        method: "ASL/TM/HACH/8029",
        unit: "mg/L F⁻",
        standard: "1.5",
        resultKey: "borehole_fluoride_result",
        remarkKey: "borehole_fluoride_remark",
      },
    ],
  };

  const chemicalTestsCations: TestCategory<BoreholeResults> = {
    title: "Chemical Tests (Cations)",
    parameters: [
      {
        name: "Calcium",
        method: "ASL/TM/HACH/8213",
        unit: "mg/L Ca",
        standard: "150",
        resultKey: "borehole_calcium_result",
        remarkKey: "borehole_calcium_remark",
      },
      {
        name: "Magnesium",
        method: "ASL/TM/HACH/8213",
        unit: "mg/L Mg",
        standard: "100",
        resultKey: "borehole_magnesium_result",
        remarkKey: "borehole_magnesium_remark",
      },
      {
        name: "Iron",
        method: "ASL/TM/HACH/8008",
        unit: "mg/L Fe",
        standard: "0.3",
        resultKey: "borehole_iron_result",
        remarkKey: "borehole_iron_remark",
      },
      {
        name: "Manganese",
        method: "ASL/TM/HACH/8149",
        unit: "mg/L Mn",
        standard: "0.1",
        resultKey: "borehole_manganese_result",
        remarkKey: "borehole_manganese_remark",
      },
    ],
  };

  const otherParameters: TestCategory<BoreholeResults> = {
    title: "Other Parameters",
    parameters: [
      {
        name: "Total Hardness",
        method: "ASL/TM/HACH/8213",
        unit: "mg/L CaCO₃",
        standard: "300",
        resultKey: "borehole_total_hardness_result",
        remarkKey: "borehole_total_hardness_remark",
      },
      {
        name: "Calcium Hardness",
        method: "ASL/TM/HACH/8213",
        unit: "mg/L Ca²⁺",
        standard: "NS",
        resultKey: "borehole_calcium_hardness_result",
        remarkKey: "borehole_calcium_hardness_remark",
      },
      {
        name: "Magnesium Hardness",
        method: "ASL/TM/HACH/8213",
        unit: "mg/L Mg²⁺",
        standard: "NS",
        resultKey: "borehole_magnesium_hardness_result",
        remarkKey: "borehole_magnesium_hardness_remark",
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
          results={results}
        />
        <TestCategorySection
          title={chemicalTestsAnions.title}
          parameters={chemicalTestsAnions.parameters}
          certificate={certificate}
          results={results}
        />
        <TestCategorySection
          title={chemicalTestsCations.title}
          parameters={chemicalTestsCations.parameters}
          certificate={certificate}
          results={results}
        />
        <TestCategorySection
          title={otherParameters.title}
          parameters={otherParameters.parameters}
          certificate={certificate}
          results={results}
        />

        {certificate.comments && (
          <View style={styles.commentsSection}>
            <Text style={styles.commentsLabel}>Comments:</Text>
            <Text style={styles.commentsText}>{certificate.comments}</Text>
          </View>
        )}

        <Footer legends={BOREHOLE_LEGENDS} certificateType='borehole' />
      </Page>
    </Document>
  );
}
