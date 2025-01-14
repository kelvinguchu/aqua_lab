"use client";

import { format } from "date-fns";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { Certificate } from "@/lib/types";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF7E6", // Light yellowish background like in the image
    padding: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: "1pt solid #000",
    paddingBottom: 10,
  },
  logo: {
    width: 80,
    marginRight: 20,
  },
  headerText: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  companyDetails: {
    fontSize: 10,
    color: "#1E3A8A",
    marginTop: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#1E3A8A",
    textDecoration: "underline",
  },
  infoTable: {
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: "row",
    marginVertical: 2,
  },
  infoLabel: {
    width: "30%",
    fontSize: 10,
    fontWeight: "bold",
  },
  infoValue: {
    width: "70%",
    fontSize: 10,
  },
  resultsTable: {
    marginVertical: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1E3A8A",
    color: "#FFF",
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#1E3A8A",
    borderBottomWidth: 1,
    padding: 5,
    fontSize: 9,
  },
  parameterCol: { width: "25%" },
  methodCol: { width: "20%" },
  unitCol: { width: "10%" },
  resultCol: { width: "15%" },
  standardCol: { width: "15%" },
  remarkCol: { width: "15%" },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#1E3A8A",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
  },
  comments: {
    fontSize: 10,
    marginBottom: 20,
  },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  signatureBlock: {
    width: "45%",
  },
  signatureLine: {
    borderTopWidth: 1,
    borderColor: "#1E3A8A",
    marginBottom: 5,
  },
  signatureName: {
    fontSize: 10,
    textAlign: "center",
  },
  signatureTitle: {
    fontSize: 8,
    textAlign: "center",
    color: "#1E3A8A",
  },
  disclaimer: {
    fontSize: 8,
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
    color: "#666",
  },
});

export function CertificatePDF({ data }: { data: Certificate }) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src='/logo.png' style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.companyName}>AQUATREAT SOLUTIONS LTD</Text>
            <Text style={styles.companyDetails}>
              Water & Effluent Treatment Specialists{"\n"}
              P.O Box 25559 - 00100, NAIROBI{"\n"}
              Tel: +254 722 311 468 / +254 738 405 490{"\n"}
              Email: info@aquatreat.co.ke
            </Text>
          </View>
        </View>

        <Text style={styles.title}>LABORATORY TEST REPORT</Text>

        {/* Sample Information */}
        <View style={styles.infoTable}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sample ID:</Text>
            <Text style={styles.infoValue}>{data.sample_id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Description:</Text>
            <Text style={styles.infoValue}>{data.description_of_sample}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Source:</Text>
            <Text style={styles.infoValue}>{data.sample_source}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date of Sampling:</Text>
            <Text style={styles.infoValue}>
              {format(new Date(data.date_of_sampling), "PPP")}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date of Analysis:</Text>
            <Text style={styles.infoValue}>
              {format(new Date(data.date_of_analysis), "PPP")}
            </Text>
          </View>
        </View>

        {/* Test Results */}
        {(["physical", "anions", "cations", "other"] as const).map(
          (category) => (
            <View key={category} style={styles.resultsTable}>
              <Text style={styles.sectionTitle}>
                {category === "physical"
                  ? "Physical Tests"
                  : category === "anions"
                  ? "Chemical Tests (Anions)"
                  : category === "cations"
                  ? "Chemical Tests (Cations)"
                  : "Other Parameters"}
              </Text>
              <View style={styles.tableHeader}>
                <Text style={styles.parameterCol}>Parameter</Text>
                <Text style={styles.methodCol}>Method</Text>
                <Text style={styles.unitCol}>Unit</Text>
                <Text style={styles.resultCol}>Result</Text>
                <Text style={styles.standardCol}>Standard</Text>
                <Text style={styles.remarkCol}>Remark</Text>
              </View>
              {getParametersByCategory(category).map((param) => (
                <View key={param.name} style={styles.tableRow}>
                  <Text style={styles.parameterCol}>{param.name}</Text>
                  <Text style={styles.methodCol}>{param.method}</Text>
                  <Text style={styles.unitCol}>{param.unit}</Text>
                  <Text style={styles.resultCol}>
                    {String(data[param.resultKey as keyof typeof data])}
                  </Text>
                  <Text style={styles.standardCol}>{param.standard}</Text>
                  <Text style={styles.remarkCol}>
                    {String(data[param.remarkKey as keyof typeof data])}
                  </Text>
                </View>
              ))}
            </View>
          )
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.comments}>{data.comments}</Text>
          <View style={styles.signatureSection}>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>DENIS KIPKIRUI</Text>
              <Text style={styles.signatureTitle}>
                WATER QUALITY LAB TECHNICIAN
              </Text>
            </View>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>ISAAC NJENGA</Text>
              <Text style={styles.signatureTitle}>QUALITY CONTROL MANAGER</Text>
            </View>
          </View>
          <Text style={styles.disclaimer}>
            This report shall not be reproduced in full or part except with
            written approval from Aquatreat Solutions Limited.{"\n"}
            The results relate to the sample(s) submitted. The laboratory will
            not be held responsible for any sampling errors.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
