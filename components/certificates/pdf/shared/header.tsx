"use client";

import { Text, View, Image } from "@react-pdf/renderer";
import { styles } from "./styles";

export function Header() {
  return (
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
}
