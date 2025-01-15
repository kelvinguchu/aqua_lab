"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { Certificate } from "@/lib/supabase";
import {
  TEST_PARAMETERS,
  getParametersByCategory,
  checkStandard,
} from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
    backgroundColor: "#FAEEC5",
    padding: 40,
    position: "relative",
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  logoSection: {
    width: "60%",
  },
  logo: {
    width: 300,
    height: 120,
    objectFit: "contain",
  },
  companyInfo: {
    width: "40%",
    textAlign: "right",
  },
  companyAddress: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#333",
  },
  title: {
    fontFamily: "Times-Roman",
    fontWeight: "heavy",
    fontSize: 18,
    color: "#1E88E5",
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  infoSection: {
    flexDirection: "row",
    marginBottom: 30,
    gap: 20,
    borderBottom: "1pt solid #000",
    paddingBottom: 20,
  },
  infoColumn: {
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    width: 140,
    fontSize: 10,
    fontWeight: "bold",
  },
  infoValue: {
    flex: 1,
    fontSize: 10,
  },
  table: {
    marginTop: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 18,
  },
  categoryHeader: {
    padding: 10,
    fontSize: 12,
    fontWeight: "heavy",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableHeaderCell: {
    fontWeight: "heavy",
    padding: "2px 8px",
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
  },
  tableCell: {
    padding: "2px 8px",
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "left",
  },
  col1: { width: "18%" },
  col2: { width: "22%" },
  col3: { width: "14%" },
  col4: { width: "14%" },
  col5: { width: "17%" },
  col6: { width: "15%" },
  footer: {
    marginTop: 5,
  },
  footerText: {
    fontSize: 8,
    marginBottom: 5,
    fontStyle: "italic",
  },
  signatureSection: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    borderTop: "1pt solid #000",
    paddingTop: 20,
  },
  signature: {
    width: "45%",
  },
  signatureTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 10,
  },
  signatureContact: {
    fontSize: 8,
    marginTop: 2,
  },
  legend: {
    fontSize: 9,
    marginBottom: 5,
    fontWeight: "bold",
  },
  tableCellData: {
    padding: 8,
    fontSize: 9,
    textAlign: "left",
  },
  categoryHeaderWrapper: {
    width: "100%",
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    width: "100%",
    marginBottom: 8,
  },
  legendSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  resultsSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  infoValueWrap: {
    flex: 1,
    fontSize: 10,
    flexWrap: "wrap",
  },
  tableWrapper: {
    marginTop: 20,
    marginBottom: 200,
  },
  parameterCell: {
    width: "22%",
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  methodCell: {
    width: "28%",
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  unitCell: {
    width: "10%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
  },
  resultCell: {
    width: "10%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
  },
  standardCell: {
    width: "20%",
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  remarkCell: {
    width: "10%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  centerText: {
    textAlign: "center",
  },
  italicText: {
    fontStyle: "italic",
  },
  companyDetails: {
    marginTop: 10,
    fontSize: 8,
  },
  disclaimer: {
    fontSize: 8,
    fontStyle: "italic",
    marginTop: 10,
  },
  titleWrapper: {
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  dateSection: {
    flexDirection: "row",
    gap: 40,
    marginBottom: 20,
  },
  signatureBlock: {
    width: "45%",
    marginTop: 20,
  },
  signatureName: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 5,
  },
  signatureRole: {
    fontSize: 9,
    marginTop: 2,
  },
  signatureDate: {
    fontSize: 8,
    marginTop: 5,
    fontStyle: "italic",
  },
  pageNumber: {
    fontSize: 8,
    marginTop: 10,
    textAlign: "right",
  },
  mainContent: {
    minHeight: "100%",
    paddingBottom: 200,
  },
  microbiologicalTitle: {
    fontSize: 12,
    fontWeight: "heavy",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 10,
  },
});

type CertificatePDFProps = {
  certificate: Certificate;
};

const Header = () => (
  <>
    <View style={styles.headerContainer}>
      <View style={styles.logoSection}>
        <Image
          src='https://res.cloudinary.com/dijdyn5c5/image/upload/v1736880813/logo_lljwcd.png'
          style={styles.logo}
        />
      </View>
      <View style={styles.companyInfo}>
        <Text style={styles.companyAddress}>
          Along Eastern Bypass, Utawala Junction{"\n"}
          Opp Tumaini Supermarket,{"\n"}
          Golden court plot no. 31/32{"\n"}
          P.O.BOX 26559 – 00100{"\n"}
          Tel: +254 20 2317314/ +254724083450{"\n"}
          +254 720559614, +254 722202189{"\n"}
          Email: info@aquatreat.co.ke{"\n"}
          Website: www.aquatreat.co.ke
        </Text>
      </View>
    </View>
    <Text style={styles.title}>LABORATORY TEST REPORT</Text>
  </>
);

const TableHeader = () => (
  <View style={styles.tableRow} wrap={false}>
    <View style={[styles.tableHeaderCell, styles.col1]}>
      <Text>PARAMETERS</Text>
    </View>
    <View style={[styles.tableHeaderCell, styles.col2]}>
      <Text>METHOD ANALYSIS</Text>
    </View>
    <View style={[styles.tableHeaderCell, styles.col3]}>
      <Text>UNITS</Text>
    </View>
    <View style={[styles.tableHeaderCell, styles.col4]}>
      <Text>RESULTS</Text>
    </View>
    <View style={[styles.tableHeaderCell, styles.col5]}>
      <Text>KS EAS 12:2018</Text>
    </View>
    <View style={[styles.tableHeaderCell, styles.col6]}>
      <Text>REMARKS</Text>
    </View>
  </View>
);

export function CertificatePDF({ certificate }: CertificatePDFProps) {
  return (
    <Document>
      <Page size='A4' style={styles.page} wrap>
        <Header />
        <View style={styles.dateSection}>
          <View style={styles.infoColumn}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date:</Text>
              <Text style={styles.infoValue}>{certificate.date_of_report}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Description of Sample:</Text>
              <Text style={styles.infoValue}>
                {certificate.description_of_sample}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Sample Source:</Text>
              <Text style={styles.infoValue}>{certificate.sample_source}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Submitted By:</Text>
              <Text style={styles.infoValue}>{certificate.submitted_by}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Customer Contact:</Text>
              <Text style={styles.infoValue}>
                {certificate.customer_contact}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Sampled By:</Text>
              <Text style={styles.infoValue}>{certificate.sampled_by}</Text>
            </View>
          </View>

          <View style={styles.infoColumn}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date of Sampling:</Text>
              <Text style={styles.infoValue}>
                {certificate.date_of_sampling}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date Sample Received:</Text>
              <Text style={styles.infoValue}>
                {certificate.date_sample_received}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date of Analysis:</Text>
              <Text style={styles.infoValue}>
                {certificate.date_of_analysis}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Certificate ID:</Text>
              <Text style={styles.infoValue}>{certificate.certificate_id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Sample ID:</Text>
              <Text style={styles.infoValue}>{certificate.sample_id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date of Report Issue:</Text>
              <Text style={styles.infoValue}>
                {certificate.date_of_report_issue}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <TableHeader />
          {/* Physical Tests */}
          <View style={styles.categoryHeader} wrap={false}>
            <Text>PHYSICAL TESTS</Text>
          </View>
          {getParametersByCategory("physical").map((param) => (
            <View style={styles.tableRow} key={param.name} wrap={false}>
              <View style={[styles.tableCell, styles.col1]}>
                <Text>{param.name}</Text>
              </View>
              <View style={[styles.tableCell, styles.col2]}>
                <Text>{param.method}</Text>
              </View>
              <View style={[styles.tableCell, styles.col3]}>
                <Text>{param.unit}</Text>
              </View>
              <View style={[styles.tableCell, styles.col4]}>
                <Text>{certificate[param.resultKey] ?? "ND"}</Text>
              </View>
              <View style={[styles.tableCell, styles.col5]}>
                <Text>{param.standard}</Text>
              </View>
              <View style={[styles.tableCell, styles.col6]}>
                <Text>
                  {certificate[param.remarkKey] ??
                    checkStandard(param, certificate[param.resultKey])}
                </Text>
              </View>
            </View>
          ))}

          {/* Chemical Tests (Anions) */}
          <View style={styles.categoryHeader} wrap={false}>
            <Text>CHEMICAL TESTS (ANIONS)</Text>
          </View>
          {getParametersByCategory("anions").map((param) => (
            <View style={styles.tableRow} key={param.name} wrap={false}>
              <View style={[styles.tableCell, styles.col1]}>
                <Text>{param.name}</Text>
              </View>
              <View style={[styles.tableCell, styles.col2]}>
                <Text>{param.method}</Text>
              </View>
              <View style={[styles.tableCell, styles.col3]}>
                <Text>{param.unit}</Text>
              </View>
              <View style={[styles.tableCell, styles.col4]}>
                <Text>{certificate[param.resultKey] ?? "ND"}</Text>
              </View>
              <View style={[styles.tableCell, styles.col5]}>
                <Text>{param.standard}</Text>
              </View>
              <View style={[styles.tableCell, styles.col6]}>
                <Text>
                  {certificate[param.remarkKey] ??
                    checkStandard(param, certificate[param.resultKey])}
                </Text>
              </View>
            </View>
          ))}

          {/* Chemical Tests (Cations) */}
          <View style={styles.categoryHeader} wrap={false}>
            <Text>CHEMICAL TESTS (CATIONS)</Text>
          </View>
          {getParametersByCategory("cations").map((param) => (
            <View style={styles.tableRow} key={param.name} wrap={false}>
              <View style={[styles.tableCell, styles.col1]}>
                <Text>{param.name}</Text>
              </View>
              <View style={[styles.tableCell, styles.col2]}>
                <Text>{param.method}</Text>
              </View>
              <View style={[styles.tableCell, styles.col3]}>
                <Text>{param.unit}</Text>
              </View>
              <View style={[styles.tableCell, styles.col4]}>
                <Text>{certificate[param.resultKey] ?? "ND"}</Text>
              </View>
              <View style={[styles.tableCell, styles.col5]}>
                <Text>{param.standard}</Text>
              </View>
              <View style={[styles.tableCell, styles.col6]}>
                <Text>
                  {certificate[param.remarkKey] ??
                    checkStandard(param, certificate[param.resultKey])}
                </Text>
              </View>
            </View>
          ))}

          {/* Other Parameters */}
          <View style={styles.categoryHeader} wrap={false}>
            <Text>OTHER PARAMETERS</Text>
          </View>
          {getParametersByCategory("other").map((param) => (
            <View style={styles.tableRow} key={param.name} wrap={false}>
              <View style={[styles.tableCell, styles.col1]}>
                <Text>{param.name}</Text>
              </View>
              <View style={[styles.tableCell, styles.col2]}>
                <Text>{param.method}</Text>
              </View>
              <View style={[styles.tableCell, styles.col3]}>
                <Text>{param.unit}</Text>
              </View>
              <View style={[styles.tableCell, styles.col4]}>
                <Text>{certificate[param.resultKey] ?? "ND"}</Text>
              </View>
              <View style={[styles.tableCell, styles.col5]}>
                <Text>{param.standard}</Text>
              </View>
              <View style={[styles.tableCell, styles.col6]}>
                <Text>
                  {certificate[param.remarkKey] ??
                    checkStandard(param, certificate[param.resultKey])}
                </Text>
              </View>
            </View>
          ))}

          {/* Microbiological Tests */}
          <View style={[styles.categoryHeader]} wrap={false}>
            <Text>MICROBIOLOGICAL TESTS</Text>
          </View>

          <View style={styles.tableRow} wrap={false}>
            <View style={[styles.tableHeaderCell, { width: "35%" }]}>
              <Text>TEST</Text>
            </View>
            <View style={[styles.tableHeaderCell, { width: "20%" }]}>
              <Text>METHOD</Text>
            </View>
            <View style={[styles.tableHeaderCell, { width: "20%" }]}>
              <Text>KS EAS 12:2018</Text>
            </View>
            <View style={[styles.tableHeaderCell, { width: "12.5%" }]}>
              <Text>RESULTS</Text>
            </View>
            <View style={[styles.tableHeaderCell, { width: "12.5%" }]}>
              <Text>REMARKS</Text>
            </View>
          </View>

          {/* Total Viable Counts */}
          <View style={styles.tableRow} wrap={false}>
            <View style={[styles.tableCell, { width: "35%" }]}>
              <Text>Total Viable Counts at 37°C CFU/ml Max</Text>
            </View>
            <View style={[styles.tableCell, { width: "20%" }]}>
              <Text>ISO Method 6222:99</Text>
            </View>
            <View style={[styles.tableCell, { width: "20%" }]}>
              <Text>50 Max</Text>
            </View>
            <View
              style={[styles.tableCell, { width: "12.5%" }, styles.centerText]}>
              <Text>{certificate.total_viable_counts_result}</Text>
            </View>
            <View
              style={[styles.tableCell, { width: "12.5%" }, styles.centerText]}>
              <Text>{certificate.total_viable_counts_remark}</Text>
            </View>
          </View>

          {/* Coliforms */}
          <View style={styles.tableRow} wrap={false}>
            <View style={[styles.tableCell, { width: "35%" }]}>
              <Text>MPN of Coliforms Organisms in a 100 ml sample</Text>
            </View>
            <View style={[styles.tableCell, { width: "20%" }]}>
              <Text>ASL/TM/HACH/8001</Text>
            </View>
            <View style={[styles.tableCell, { width: "20%" }]}>
              <Text>Shall be absent</Text>
            </View>
            <View
              style={[styles.tableCell, { width: "12.5%" }, styles.centerText]}>
              <Text>{certificate.coliforms_mpn_result}</Text>
            </View>
            <View
              style={[styles.tableCell, { width: "12.5%" }, styles.centerText]}>
              <Text>{certificate.coliforms_mpn_remark}</Text>
            </View>
          </View>

          {/* E-Coli */}
          <View style={styles.tableRow} wrap={false}>
            <View style={[styles.tableCell, { width: "35%" }]}>
              <Text>MPN of E-Coli Organisms in a 100 ml sample</Text>
            </View>
            <View style={[styles.tableCell, { width: "20%" }]}>
              <Text>ASL/TM/HACH/8001</Text>
            </View>
            <View style={[styles.tableCell, { width: "20%" }]}>
              <Text>Shall be absent</Text>
            </View>
            <View
              style={[styles.tableCell, { width: "12.5%" }, styles.centerText]}>
              <Text>{certificate.ecoli_mpn_result}</Text>
            </View>
            <View
              style={[styles.tableCell, { width: "12.5%" }, styles.centerText]}>
              <Text>{certificate.ecoli_mpn_remark}</Text>
            </View>
          </View>

          {/* Faecal Coliforms */}
          <View style={styles.tableRow} wrap={false}>
            <View style={[styles.tableCell, { width: "35%" }]}>
              <Text>MPN of Faecal Coliforms Organisms in a 100 ml sample</Text>
            </View>
            <View style={[styles.tableCell, { width: "20%" }]}>
              <Text>ASL/TM/HACH/8001</Text>
            </View>
            <View style={[styles.tableCell, { width: "20%" }]}>
              <Text>Shall be absent</Text>
            </View>
            <View
              style={[styles.tableCell, { width: "12.5%" }, styles.centerText]}>
              <Text>{certificate.faecal_coliforms_mpn_result}</Text>
            </View>
            <View
              style={[styles.tableCell, { width: "12.5%" }, styles.centerText]}>
              <Text>{certificate.faecal_coliforms_mpn_remark}</Text>
            </View>
          </View>
        </View>

        {/* Legend Section */}
        <View style={styles.legendSection}>
          <Text style={styles.legend}>NS: Not Set Standard</Text>
          <Text style={styles.legend}>ND: Not Detected</Text>
          <Text style={styles.legend}>MPN: Most Probable Number</Text>
          <Text style={styles.legend}>{">: Greater Than"}</Text>
          <Text style={styles.legend}>KS: Kenya Standard (KS EAS 12:2018)</Text>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <View style={styles.disclaimer}>
            <Text style={styles.footerText}>
              This test report shall not be reproduced in full or part except
              with written approval from Aquatreat Solutions Limited.
            </Text>
            <Text style={styles.footerText}>
              The results relate to the sample(s) submitted. The laboratory will
              not be held responsible for any sampling errors.
            </Text>
            <Text style={styles.footerText}>
              The results above are within the recommended standard values for
              potable water.
            </Text>
          </View>

          <View style={styles.signatureSection}>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>DENIS KIPKIRUI</Text>
              <Text style={styles.signatureRole}>WATER QUALITY LAB</Text>
            </View>

            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>ISAAC NJENGA</Text>
              <Text style={styles.signatureRole}>QUALITY CONTROL MANAGER</Text>
            </View>
          </View>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
