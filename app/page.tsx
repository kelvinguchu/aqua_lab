"use client";

import { useState } from "react";
import Image from "next/image";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image as PDFImage,
} from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCell: {
    padding: 5,
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  certNumber: {
    marginTop: 20,
    fontSize: 12,
  },
});

const CertificatePDF = ({
  certificateNumber,
}: {
  certificateNumber: string;
}) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.header}>
        <PDFImage src='/logo.png' style={styles.logo} />
      </View>
      <Text style={styles.title}>Certificate of Analysis</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Parameter</Text>
          <Text style={styles.tableCell}>Result</Text>
          <Text style={styles.tableCell}>Unit</Text>
        </View>
        {/* Add your table rows here */}
      </View>
      <Text style={styles.certNumber}>
        Certificate Number: {certificateNumber}
      </Text>
    </Page>
  </Document>
);

export default function Home() {
  const [certificateNumber, setCertificateNumber] = useState("");

  const generateCertificate = async () => {
    const newCertNumber = uuidv4();
    setCertificateNumber(newCertNumber);

    // Save to Supabase
    const { error } = await supabase
      .from("certificates")
      .insert([{ certificate_number: newCertNumber }]);

    if (error) {
      console.error("Error saving certificate:", error);
    }
  };

  return (
    <div className='min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>Certificate Generator</h1>

        <button
          onClick={generateCertificate}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-8'>
          Generate New Certificate
        </button>

        {certificateNumber && (
          <div className='h-[800px]'>
            <PDFViewer width='100%' height='100%'>
              <CertificatePDF certificateNumber={certificateNumber} />
            </PDFViewer>
          </div>
        )}
      </div>
    </div>
  );
}
