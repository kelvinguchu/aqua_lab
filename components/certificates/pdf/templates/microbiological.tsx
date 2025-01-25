"use client";

import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "../shared/styles";
import { Header } from "../shared/header";
import { Footer } from "../shared/footer";
import { DateSection } from "../shared/date-section";
import { BasePDFProps, DateInfo, TestParameter } from "../shared/types";

const MICROBIOLOGICAL_LEGENDS = [
  "NS: Not Set Standard",
  "ND: Not Detected",
  "KS: Kenya Standard (KS EAS 12:2018)",
  "CFU: Colony Forming Units",
  "MPN: Most Probable Number",
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
}: {
  title: string;
  parameters: TestParameter[];
  certificate: any;
}) => {
  // Filter out empty parameters
  const nonEmptyParameters = parameters.filter((param) => {
    const result = certificate[param.resultKey];
    return (
      result !== null &&
      result !== undefined &&
      result !== "" &&
      result !== "ND" &&
      result !== "NaN" &&
      String(result).toLowerCase() !== "nan"
    );
  });

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
            <Text>{certificate[param.resultKey]}</Text>
          </View>
          <View style={[styles.tableCell, { width: "15%" }]}>
            <Text>{param.standard}</Text>
          </View>
          <View style={[styles.tableCell, { width: "10%" }]}>
            <Text>{certificate[param.remarkKey]}</Text>
          </View>
        </View>
      ))}
    </>
  );
};

export function MicrobiologicalPDF({ certificate }: BasePDFProps) {
  const dateInfo: DateInfo[] = [
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

  return (
    <Document>
      <Page size='A4' style={styles.page} wrap>
        <Header />
        <DateSection dateInfo={dateInfo} />

        <View style={styles.table}>
          <TableHeader />

          {/* Microbiological Tests */}
          <TestCategorySection
            title='MICROBIOLOGICAL TESTS'
            parameters={[
              {
                name: "Total Viable Counts",
                method: "ASL/TM/HACH/8242",
                unit: "CFU/ml",
                standard: "< 100",
                resultKey: "total_viable_counts_result",
                remarkKey: "total_viable_counts_remark",
              },
              {
                name: "Total Coliforms MPN",
                method: "ASL/TM/HACH/8074",
                unit: "MPN/100ml",
                standard: "NIL",
                resultKey: "coliforms_mpn_result",
                remarkKey: "coliforms_mpn_remark",
              },
              {
                name: "E. coli MPN",
                method: "ASL/TM/HACH/8074",
                unit: "MPN/100ml",
                standard: "NIL",
                resultKey: "ecoli_mpn_result",
                remarkKey: "ecoli_mpn_remark",
              },
              {
                name: "Faecal Coliforms MPN",
                method: "ASL/TM/HACH/8074",
                unit: "MPN/100ml",
                standard: "NIL",
                resultKey: "faecal_coliforms_mpn_result",
                remarkKey: "faecal_coliforms_mpn_remark",
              },
            ]}
            certificate={certificate}
          />
        </View>

        {certificate.comments && (
          <View style={styles.commentsSection}>
            <Text style={styles.commentsLabel}>Comments:</Text>
            <Text style={styles.commentsText}>{certificate.comments}</Text>
          </View>
        )}

        <Footer
          legends={MICROBIOLOGICAL_LEGENDS}
          certificateType='microbiological'
        />
      </Page>
    </Document>
  );
}
