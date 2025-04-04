import React from "react";
import { Page, Text, View, Document, StyleSheet} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 20, fontFamily: "Helvetica" },
    header: { fontSize: 22, textAlign: "center", marginBottom: 10, fontWeight: "bold", textDecoration: "underline" },
    section: { marginBottom: 15, padding: 10, border: "1px solid #000", borderRadius: 5 },
    row: { flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #ddd", paddingBottom: 5, marginBottom: 5 },
    boldText: { fontSize: 14, fontWeight: "bold" },
    normalText: { fontSize: 12 },
    totalSection: { flexDirection: "row", justifyContent: "space-between", marginTop: 10, paddingTop: 5, borderTop: "2px solid black" },
    centerText: { textAlign: "center", fontSize: 12, marginTop: 10, fontStyle: "italic" }
});

export default function HostelReceiptDocument({ receipt }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                <Text style={styles.header}>Hostel Payment Receipt</Text>

                <View style={styles.section}>
                    <Text style={styles.boldText}>Booking Summary</Text>
                    <View style={styles.row}>
                        <Text style={styles.normalText}>Check-in:</Text>
                        <Text style={styles.normalText}>{receipt.checkIn}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.normalText}>Check-out:</Text>
                        <Text style={styles.normalText}>{receipt.checkOut}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.boldText}>Payment Details</Text>

                    {receipt.fees.map((fee, index) => (
                        <View style={styles.row} key={index}>
                            <Text style={styles.normalText}>{fee.name}</Text>
                            <Text style={styles.normalText}>₦ {fee.amount}</Text>
                        </View>
                    ))}

                    <View style={styles.totalSection}>
                        <Text style={styles.boldText}>Total:</Text>
                        <Text style={styles.boldText}>₦ {receipt.total}</Text>
                    </View>
                </View>

                <Text style={styles.centerText}>Thank you for choosing our hostel</Text>

            </Page>
        </Document>
    );
}