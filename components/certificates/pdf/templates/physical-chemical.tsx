"use client";

import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "../shared/styles";
import { Header } from "../shared/header";
import { Footer } from "../shared/footer";
import { DateSection } from "../shared/date-section";
import {
  PhysicalChemicalPDFProps,
  TestCategory,
  PhysicalChemicalResults,
} from "../shared/types";

const PHYSICAL_CHEMICAL_LEGENDS = [
  "NS: Not Set Standard",
  "ND: Not Detected",
  "KS: Kenya Standard (KS EAS 12:2018)",
];

const TableHeader = () => (
  <View style={styles.tableRow} wrap={false}>
    <View style={[styles.tableHeaderCell, { width: "20%" }]}>
      <Text>PARAMETERS</Text>
    </View>
    <View style={[styles.tableHeaderCell, { width: "25%" }]}>
      <Text>METHOD ANALYSIS</Text>
    </View>
    <View style={[styles.tableHeaderCell, { width: "15%" }]}>
      <Text>UNITS</Text>
    </View>
    <View style={[styles.tableHeaderCell, { width: "15%" }]}>
      <Text>RESULTS</Text>
    </View>
    <View style={[styles.tableHeaderCell, { width: "15%" }]}>
      <Text>KS EAS 12:2018</Text>
    </View>
    <View style={[styles.tableHeaderCell, { width: "10%" }]}>
      <Text>REMARKS</Text>
    </View>
  </View>
);

const TestCategorySection = ({
  title,
  parameters,
  certificate,
  results,
}: TestCategory<PhysicalChemicalResults> & PhysicalChemicalPDFProps) => {
  // Filter out empty parameters
  const nonEmptyParameters = parameters.filter(
    (param) =>
      results[param.resultKey] !== null && results[param.resultKey] !== ""
  );

  if (nonEmptyParameters.length === 0) return null;

  return (
    <>
      <View style={styles.categoryHeader} wrap={false}>
        <Text>{title}</Text>
      </View>
      {nonEmptyParameters.map((param) => (
        <View style={styles.tableRow} key={param.name} wrap={false}>
          <View style={[styles.tableCell, { width: "20%" }]}>
            <Text>{param.name}</Text>
          </View>
          <View style={[styles.tableCell, { width: "25%" }]}>
            <Text>{param.method}</Text>
          </View>
          <View style={[styles.tableCell, { width: "15%" }]}>
            <Text>{param.unit}</Text>
          </View>
          <View style={[styles.tableCell, { width: "15%" }]}>
            <Text>{results[param.resultKey]}</Text>
          </View>
          <View style={[styles.tableCell, { width: "15%" }]}>
            <Text>{param.standard}</Text>
          </View>
          <View style={[styles.tableCell, { width: "10%" }]}>
            <Text>{results[param.remarkKey]}</Text>
          </View>
        </View>
      ))}
    </>
  );
};

export function PhysicalChemicalPDF({
  certificate,
  results,
}: PhysicalChemicalPDFProps) {
  const dateInfo = [
    { label: "Date:", value: certificate.date_of_report },
    { label: "Sample ID:", value: certificate.sample_id },
    { label: "Certificate:", value: certificate.certificate_id },
    { label: "Source:", value: certificate.sample_source },
    { label: "Date Sampled:", value: certificate.date_of_sampling },
    { label: "Date Received:", value: certificate.date_sample_received },
    { label: "Date Analyzed:", value: certificate.date_of_analysis },
    { label: "Date Reported:", value: certificate.date_of_report_issue },
    { label: "Description:", value: certificate.description_of_sample },
    { label: "Submitted By:", value: certificate.submitted_by },
    { label: "Contact:", value: certificate.customer_contact },
    { label: "Sampled By:", value: certificate.sampled_by },
  ];

  const physicalTests: TestCategory<PhysicalChemicalResults> = {
    title: "PHYSICAL TESTS",
    parameters: [
      {
        name: "pH",
        method: "ASL/TM/HACH/8156",
        unit: "pH Units",
        standard: "6.5 – 8.5",
        resultKey: "ph_result",
        remarkKey: "ph_remark",
      },
      {
        name: "Turbidity",
        method: "ASL/TM/HACH/8195",
        unit: "NTU",
        standard: "< 5.0",
        resultKey: "turbidity_result",
        remarkKey: "turbidity_remark",
      },
      {
        name: "Color",
        method: "ASL/TM/HACH/8025",
        unit: "Pt. Co. APHA",
        standard: "15 TCU",
        resultKey: "color_result",
        remarkKey: "color_remark",
      },
      {
        name: "Total Suspended Solids",
        method: "ASL/TM/HACH/8006",
        unit: "mg/L",
        standard: "NIL",
        resultKey: "tss_result",
        remarkKey: "tss_remark",
      },
      {
        name: "Total Dissolved Solids",
        method: "ASL/TM/HACH/8169",
        unit: "mg/L",
        standard: "1000 Max.",
        resultKey: "tds_result",
        remarkKey: "tds_remark",
      },
      {
        name: "Conductivity",
        method: "ASL/TM/HACH/8169",
        unit: "µS/cm",
        standard: "1500",
        resultKey: "conductivity_result",
        remarkKey: "conductivity_remark",
      },
    ],
  };

  const chemicalTestsAnions: TestCategory<PhysicalChemicalResults> = {
    title: "CHEMICAL TESTS (ANIONS)",
    parameters: [
      {
        name: "Phenolphthalein Alkalinity",
        method: "ASL/TM/HACH/8203",
        unit: "mg/L CaCO₃",
        standard: "NS",
        resultKey: "ph_alkalinity_result",
        remarkKey: "ph_alkalinity_remark",
      },
      {
        name: "Total Alkalinity",
        method: "ASL/TM/HACH/8203",
        unit: "mg/L CaCO₃",
        standard: "NS",
        resultKey: "total_alkalinity_result",
        remarkKey: "total_alkalinity_remark",
      },
      {
        name: "Chloride",
        method: "ASL/TM/HACH/8207",
        unit: "mg/L Cl⁻",
        standard: "250",
        resultKey: "chloride_result",
        remarkKey: "chloride_remark",
      },
      {
        name: "Fluoride",
        method: "ASL/TM/HACH/8029",
        unit: "mg/L",
        standard: "1.5",
        resultKey: "fluoride_result",
        remarkKey: "fluoride_remark",
      },
      {
        name: "Nitrate",
        method: "ASL/TM/HACH/8171",
        unit: "mg/L NO₃⁻",
        standard: "45",
        resultKey: "nitrate_result",
        remarkKey: "nitrate_remark",
      },
      {
        name: "Nitrite",
        method: "ASL/TM/HACH/8507",
        unit: "mg/L NO₂⁻",
        standard: "0.9",
        resultKey: "nitrite_result",
        remarkKey: "nitrite_remark",
      },
      {
        name: "Sulfate",
        method: "ASL/TM/HACH/8051",
        unit: "mg/L SO₄²⁻",
        standard: "400",
        resultKey: "sulfate_result",
        remarkKey: "sulfate_remark",
      },
      {
        name: "Phosphate",
        method: "ASL/TM/HACH/8048",
        unit: "mg/L PO₄³⁻",
        standard: "2.2",
        resultKey: "phosphate_result",
        remarkKey: "phosphate_remark",
      },
      {
        name: "Sulfide",
        method: "ASL/TM/HACH/8131",
        unit: "mg/L S²⁻",
        standard: "0.1",
        resultKey: "sulfide_result",
        remarkKey: "sulfide_remark",
      },
    ],
  };

  const chemicalTestsCations: TestCategory<PhysicalChemicalResults> = {
    title: "CHEMICAL TESTS (CATIONS)",
    parameters: [
      {
        name: "Calcium",
        method: "ASL/TM/HACH/8213",
        unit: "mg/L Ca",
        standard: "150",
        resultKey: "calcium_result",
        remarkKey: "calcium_remark",
      },
      {
        name: "Magnesium",
        method: "ASL/TM/HACH/8213",
        unit: "mg/L Mg",
        standard: "100",
        resultKey: "magnesium_result",
        remarkKey: "magnesium_remark",
      },
      {
        name: "Potassium",
        method: "ASL/TM/HACH/8049",
        unit: "mg/L K",
        standard: "50",
        resultKey: "potassium_result",
        remarkKey: "potassium_remark",
      },
      {
        name: "Sodium",
        method: "ASL/TM/HACH/8205",
        unit: "mg/L",
        standard: "200",
        resultKey: "sodium_result",
        remarkKey: "sodium_remark",
      },
      {
        name: "Iron",
        method: "ASL/TM/HACH/8008",
        unit: "mg/L Fe",
        standard: "0.3",
        resultKey: "iron_result",
        remarkKey: "iron_remark",
      },
      {
        name: "Manganese",
        method: "ASL/TM/HACH/8149",
        unit: "mg/L Mn",
        standard: "0.1",
        resultKey: "manganese_result",
        remarkKey: "manganese_remark",
      },
      {
        name: "Ammonia",
        method: "ASL/TM/HACH/8038",
        unit: "mg/L NH₃",
        standard: "0.5",
        resultKey: "ammonia_result",
        remarkKey: "ammonia_remark",
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
        name: "Zinc",
        method: "ASL/TM/HACH/8009",
        unit: "mg/L Zn",
        standard: "5.0",
        resultKey: "zinc_result",
        remarkKey: "zinc_remark",
      },
      {
        name: "Chromium",
        method: "ASL/TM/HACH/8024",
        unit: "mg/L Cr",
        standard: "0.05",
        resultKey: "chromium_result",
        remarkKey: "chromium_remark",
      },
    ],
  };

  const otherParameters: TestCategory<PhysicalChemicalResults> = {
    title: "OTHER PARAMETERS",
    parameters: [
      {
        name: "Total Hardness",
        method: "ASL/TM/HACH/8213",
        unit: "mg/L CaCO₃",
        standard: "300",
        resultKey: "total_hardness_result",
        remarkKey: "total_hardness_remark",
      },
      {
        name: "Calcium Hardness",
        method: "ASL/TM/HACH/8213",
        unit: "mg/L Ca²⁺",
        standard: "NS",
        resultKey: "calcium_hardness_result",
        remarkKey: "calcium_hardness_remark",
      },
      {
        name: "Magnesium Hardness",
        method: "ASL/TM/HACH/8213",
        unit: "mg/L Mg²⁺",
        standard: "NS",
        resultKey: "magnesium_hardness_result",
        remarkKey: "magnesium_hardness_remark",
      },
      {
        name: "Silica",
        method: "ASL/TM/HACH/8185",
        unit: "mg/L SiO₂",
        standard: "NS",
        resultKey: "silica_result",
        remarkKey: "silica_remark",
      },
      {
        name: "Free Chlorine",
        method: "ASL/TM/HACH/8167",
        unit: "mg/L Cl₂",
        standard: "0.2",
        resultKey: "free_chlorine_result",
        remarkKey: "free_chlorine_remark",
      },
    ],
  };

  return (
    <Document>
      <Page size='A4' style={styles.page} wrap>
        <Header />
        <DateSection dateInfo={dateInfo} />

        <View style={styles.table}>
          <TableHeader />

          {/* Physical Tests */}
          <TestCategorySection
            title={physicalTests.title}
            parameters={physicalTests.parameters}
            certificate={certificate}
            results={results}
          />

          {/* Chemical Tests (Anions) */}
          <TestCategorySection
            title={chemicalTestsAnions.title}
            parameters={chemicalTestsAnions.parameters}
            certificate={certificate}
            results={results}
          />

          {/* Chemical Tests (Cations) */}
          <TestCategorySection
            title={chemicalTestsCations.title}
            parameters={chemicalTestsCations.parameters}
            certificate={certificate}
            results={results}
          />

          {/* Other Parameters */}
          <TestCategorySection
            title={otherParameters.title}
            parameters={otherParameters.parameters}
            certificate={certificate}
            results={results}
          />
        </View>

        {certificate.comments && (
          <View style={styles.commentsSection}>
            <Text style={styles.commentsLabel}>Comments:</Text>
            <Text style={styles.commentsText}>{certificate.comments}</Text>
          </View>
        )}

        <Footer
          legends={PHYSICAL_CHEMICAL_LEGENDS}
          certificateType='physical_chemical'
        />
      </Page>
    </Document>
  );
}
