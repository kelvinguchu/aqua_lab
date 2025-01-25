"use client";

import { Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { CertificateType } from "./types";

interface FooterProps {
  legends?: string[];
  certificateType?: CertificateType;
}

export function Footer({
  legends = [],
  certificateType = "physical_chemical",
}: FooterProps) {
  const getDisclaimerText = () => {
    switch (certificateType) {
      case "physical_chemical":
        return "The results above are within the recommended standard values for potable water.";
      case "microbiological":
        return "The results above are within the recommended microbiological standard values for potable water.";
      case "effluent":
        return "The results above are within the recommended standard values for effluent discharge into public sewers.";
      case "irrigation":
        return "The results above are within the recommended standard values for irrigation water.";
      default:
        return "The results above are within the recommended standard values.";
    }
  };

  return (
    <>
      {/* Legend Section */}
      <View style={styles.legendSection}>
        {legends.map((legend, index) => (
          <Text key={index} style={styles.legend}>
            {legend}
          </Text>
        ))}
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <View style={styles.disclaimer}>
          <Text style={styles.footerText}>
            This test report shall not be reproduced in full or part except with
            written approval from Aquatreat Solutions Limited. The results
            relate to the sample(s) submitted. The laboratory will not be held
            responsible for any sampling errors. {getDisclaimerText()}
          </Text>
        </View>

        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <View style={styles.signatureInfo}>
              <Text style={styles.signatureName}>PURITY MATHENGE</Text>
              <Text style={styles.signatureRole}>WATER QUALITY LAB</Text>
            </View>
          </View>

          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <View style={styles.signatureInfo}>
              <Text style={styles.signatureName}>ISAAC NJENGA</Text>
              <Text style={styles.signatureRole}>QUALITY CONTROL MANAGER</Text>
            </View>
          </View>
        </View>
      </View>

      <Text
        style={styles.pageNumber}
        render={({ pageNumber }) => `Page ${pageNumber}`}
        fixed
      />
    </>
  );
}
