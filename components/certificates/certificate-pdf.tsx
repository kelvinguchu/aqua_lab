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
    padding: 15,
    position: "relative",
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  logoSection: {
    width: "50%",
  },
  logo: {
    width: 150,
    height: 60,
    objectFit: "contain",
  },
  companyInfo: {
    width: "50%",
    textAlign: "right",
  },
  companyAddress: {
    fontSize: 7,
    lineHeight: 1.2,
    color: "#333",
  },
  title: {
    fontFamily: "Times-Roman",
    fontWeight: "heavy",
    fontSize: 13,
    color: "#1E88E5",
    marginBottom: 6,
    textAlign: "center",
    textTransform: "uppercase",
  },
  infoSection: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 10,
    borderBottom: "1pt solid #000",
    paddingBottom: 10,
  },
  infoColumn: {
    flex: 1,
    paddingRight: 5,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  infoLabel: {
    width: 90,
    fontSize: 7,
    fontWeight: "bold",
  },
  infoValue: {
    flex: 1,
    fontSize: 7,
  },
  table: {
    marginTop: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 14,
  },
  categoryHeader: {
    padding: 5,
    fontSize: 11,
    fontWeight: "heavy",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableHeaderCell: {
    fontWeight: "heavy",
    padding: "0px 2px",
    fontSize: 8,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
  },
  tableCell: {
    padding: "0px 2px",
    fontSize: 8,
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
    marginTop: 2,
    borderTop: "1pt solid #000",
    paddingTop: 2,
  },
  disclaimer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  footerText: {
    fontSize: 7,
    fontStyle: "italic",
    width: "100%",
  },
  signatureSection: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "space-between",
    paddingTop: 2,
  },
  signatureBlock: {
    width: "45%",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    width: "40%",
  },
  signatureInfo: {
    width: "60%",
  },
  signatureName: {
    fontSize: 8,
    fontWeight: "bold",
  },
  signatureRole: {
    fontSize: 7,
    color: "#444",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 7,
    bottom: 4,
    right: 4,
  },
  legendSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 2,
    marginBottom: 2,
    paddingLeft: 2,
  },
  legend: {
    fontSize: 7,
    color: "#444",
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
  centerText: {
    textAlign: "center",
  },
  dateSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 0,
    marginBottom: 2,
    paddingBottom: 2,
    borderBottom: "1pt solid #000",
  },
  dateGroup: {
    flexDirection: "row",
    width: "25%",
    paddingRight: 4,
    paddingBottom: 1,
  },
  dateLabel: {
    fontSize: 7.5,
    width: "35%",
    color: "#444",
  },
  dateValue: {
    fontSize: 7.5,
    width: "65%",
    fontWeight: "bold",
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
          Along Eastern Bypass, Utawala Junction,{"\n"}
          Opp Tumaini Supermarket, Golden court plot no. 31/32{"\n"}
          P.O.BOX 26559 – 00100{"\n"}
          Tel: +254 20 2317314/ +254724083450{"\n"}
          +254 720559614, +254 722202189{"\n"}
          Email: info@aquatreat.co.ke | www.aquatreat.co.ke
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
  const dateInfo = [
    { label: "Date:", value: certificate.date_of_report },
    { label: "Sample ID:", value: certificate.sample_id },
    { label: "Certificate:", value: certificate.certificate_id },
    { label: "Source:", value: certificate.sample_source },
    { label: "Sampled:", value: certificate.date_of_sampling },
    { label: "Received:", value: certificate.date_sample_received },
    { label: "Analysis:", value: certificate.date_of_analysis },
    { label: "Report:", value: certificate.date_of_report_issue },
    { label: "Description:", value: certificate.description_of_sample },
    { label: "Submitted:", value: certificate.submitted_by },
    { label: "Contact:", value: certificate.customer_contact },
    { label: "Sampled By:", value: certificate.sampled_by },
  ];

  return (
    <Document>
      <Page size='A4' style={styles.page} wrap>
        <Header />
        <View style={styles.dateSection}>
          {dateInfo.map(({ label, value }, index) => (
            <View key={index} style={styles.dateGroup}>
              <Text style={styles.dateLabel}>{label}</Text>
              <Text style={styles.dateValue}>{value}</Text>
            </View>
          ))}
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
              with written approval from Aquatreat Solutions Limited. The
              results relate to the sample(s) submitted. The laboratory will not
              be held responsible for any sampling errors. The results above are
              within the recommended standard values for potable water.
            </Text>
          </View>

          <View style={styles.signatureSection}>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <View style={styles.signatureInfo}>
                <Text style={styles.signatureName}>DENIS KIPKIRUI</Text>
                <Text style={styles.signatureRole}>WATER QUALITY LAB</Text>
              </View>
            </View>

            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <View style={styles.signatureInfo}>
                <Text style={styles.signatureName}>ISAAC NJENGA</Text>
                <Text style={styles.signatureRole}>
                  QUALITY CONTROL MANAGER
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber }) => `Page ${pageNumber}`}
          fixed
        />
      </Page>
    </Document>
  );
}
