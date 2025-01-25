import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
    padding: 14,
    position: "relative",
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 4,
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
    fontSize: 8,
    lineHeight: 1.15,
    color: "#333",
  },
  title: {
    fontFamily: "Times-Roman",
    fontWeight: "heavy",
    fontSize: 12.5,
    color: "#1E88E5",
    marginBottom: 3,
    textAlign: "center",
    textTransform: "uppercase",
  },
  dateSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 0,
    marginBottom: 2,
    paddingBottom: 1,
    borderBottom: "1pt solid #000",
  },
  dateGroup: {
    flexDirection: "row",
    width: "33.33%",
    paddingRight: 2,
    paddingBottom: 1,
  },
  dateLabel: {
    fontSize: 8,
    width: "40%",
    color: "#444",
  },
  dateValue: {
    fontSize: 8,
    width: "60%",
    fontWeight: "bold",
  },
  section: {
    marginTop: 4,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "heavy",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  table: {
    marginTop: 2,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 12,
  },
  categoryHeader: {
    padding: 2,
    fontSize: 9,
    fontWeight: "heavy",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableHeaderCell: {
    fontWeight: "heavy",
    padding: "1px 2px",
    fontSize: 8,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
    flex: 1,
  },
  tableCell: {
    padding: "1px 2px",
    fontSize: 8,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "left",
    flex: 1,
  },
  footer: {
    marginTop: 2,
    borderTop: "1pt solid #000",
    paddingTop: 1,
  },
  disclaimer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  footerText: {
    fontSize: 6.5,
    fontStyle: "italic",
    marginBottom: 2,
  },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    paddingTop: 1,
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
  legendSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 2,
    marginBottom: 2,
  },
  legend: {
    fontSize: 6.5,
    color: "#444",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 7,
    bottom: 3,
    right: 3,
  },
  centerText: {
    textAlign: "center",
  },
  commentsSection: {
    marginTop: 3,
    marginBottom: 3,
    padding: 3,
    borderTop: "1pt solid #000",
    borderBottom: "1pt solid #000",
  },
  commentsLabel: {
    fontSize: 8,
    fontWeight: "bold",
    marginBottom: 1,
  },
  commentsText: {
    fontSize: 8,
    color: "#333",
    fontStyle: "italic",
    lineHeight: 1.2,
  },
});
