import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    table: {
        display: "flex",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        padding: 4,
    },
    tableCell: {
        fontSize: 10,
    }
});

const RenderPDFSetup = () => {
    const data = [
        { name: "Apple", qty: 10, price: 1.00 },
        { name: "Banana", qty: 20, price: 0.50 },
        { name: "Cherry", qty: 30, price: 2.00 },
    ];
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>

                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>

                <View style={styles.table}>
                    {/* Header */}
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Name</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Qty</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Price</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Total</Text></View>
                    </View>

                    {/* Rows */}
                    {data.map((item, i) => (
                        <View key={i} style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.name}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.qty}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.price}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.qty * item.price}</Text></View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    )
}

const RenderPDF = () => {

    //return ReactPDF.renderToStream(<RenderPDFSetup />);
    return (
        <>
            <div>
                <PDFDownloadLink document={<RenderPDFSetup />} fileName="render-pdf.pdf">
                    {({ loading }) =>
                        loading ? 'Loading document...' : 'Download now!'
                    }
                </PDFDownloadLink>
            </div>
        </>
    )
}

export default RenderPDF;