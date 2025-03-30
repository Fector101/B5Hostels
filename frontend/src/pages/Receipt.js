import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
// import { Button } from "@/components/ui/button"; // Uses shadcn/ui for styling

// Styled for Hostel Payment Receipt
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

// Hostel Payment Receipt Document
export default function HostelReceiptDocument({ receipt }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Receipt Title */}
                <Text style={styles.header}>Hostel Payment Receipt</Text>

                {/* Booking Summary */}
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

                {/* Fees Breakdown */}
                <View style={styles.section}>
                    <Text style={styles.boldText}>Payment Details</Text>

                    {receipt.fees.map((fee, index) => (
                        <View style={styles.row} key={index}>
                            <Text style={styles.normalText}>{fee.name}</Text>
                            <Text style={styles.normalText}>₦ {fee.amount}</Text>
                        </View>
                    ))}

                    {/* Total Amount */}
                    <View style={styles.totalSection}>
                        <Text style={styles.boldText}>Total:</Text>
                        <Text style={styles.boldText}>₦ {receipt.total}</Text>
                    </View>
                </View>

                {/* Thank You Note */}
                <Text style={styles.centerText}>Thank you for choosing our hostel</Text>

            </Page>
        </Document>
    );
}
// // Main Component
// export default function HostelReceipt({checkIn,checkOut}) {
//     const receiptData = {
//         checkIn,
//         checkOut,
//         fees: [
//             { name: "Hostel Fee", amount: "6,000" },
//             { name: "Room Charges", amount: "3,000" },
//             { name: "Maintenance Fee", amount: "3,000" }
//         ],
//         total: "12,000"
//     };

//     return (
//         <div className="page algin-items-cen flex">
//             <h2 className="text-xl font-bold">Hostel Receipt Preview</h2>

//             {/* PDF Viewer */}
//             {/* <PDFViewer width="400" height="500" className="border rounded-lg">
//         <HostelReceiptDocument receipt={receiptData} />
//       </PDFViewer> */}

//             {/* Download Button */}
//             <PDFDownloadLink document={<HostelReceiptDocument receipt={receiptData} />} fileName="hostel-receipt.pdf">
//                 {({ loading }) => <button>{loading ? "Generating..." : "Download Receipt"}</button>}
//             </PDFDownloadLink>
//         </div>
//     );
// };

