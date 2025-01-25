"use client";

import { Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { DateInfo } from "./types";

interface DateSectionProps {
  dateInfo: DateInfo[];
}

export function DateSection({ dateInfo }: DateSectionProps) {
  // Filter out empty date info
  const filteredDateInfo = dateInfo.filter(
    ({ value }) => value !== null && value !== undefined && value !== ""
  );

  return (
    <View style={styles.dateSection}>
      {filteredDateInfo.map(({ label, value }, index) => (
        <View key={index} style={styles.dateGroup}>
          <Text style={styles.dateLabel}>{label}</Text>
          <Text style={styles.dateValue}>{value}</Text>
        </View>
      ))}
    </View>
  );
}
