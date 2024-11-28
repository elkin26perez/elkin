import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      fontFamily: 'Helvetica',
    },
    header: {
     display: "flex", 
     alignItems: "center",
     justifyContent: "center",
     marginBottom: 20,
     textAlign: 'center',
     width: "100%"
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    headerSubtitle: {
      fontSize: 14,
      color: '#666',
    },
    intro: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'justify',
      color: '#444',
    },
    section: {
      marginBottom: 20,
      padding: 15,
      border: '1px solid #ccc',
      borderRadius: 5,
      backgroundColor: '#ffffff',
    },
    greeting: {
      fontSize: 14,
      marginBottom: 10,
      fontWeight: 'bold',
      color: '#333',
    },
    details: {
      marginBottom: 5,
    },
    price: {
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    footer: {
      marginTop: 30,
      textAlign: 'center',
      fontSize: 10,
      color: '#888',
    },
    social: {
      marginTop: 15,
      fontSize: 12,
      textAlign: 'center',
      color: '#444',
    },
    socialHighlight: {
      fontWeight: 'bold',
      color: '#000',
    },
  });

export const PDF = ({ solicitud }: { solicitud: Solicitud }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>


        <View style={styles.header}>
          <Text style={styles.headerTitle}>Este es el centro de solicitudes laborales</Text>
          <Text style={styles.headerSubtitle}>Acá está el detalle de tuu solicitud</Text>
        </View>


        <View key={solicitud._id} style={styles.section}>
            <Text style={styles.details}>
                Tipo: {solicitud.urgencia}
            </Text>

            <View key={solicitud._id} style={styles.details}>
            <Text style={styles.details}>Riesgo: {solicitud.riesgotrabajo}</Text>
            <Text style={styles.details}>Tipo de trabajo: {solicitud.tipotrabajo || '0'} </Text>
            <Text style={styles.details}>Creado: {solicitud.fecha_creacion}</Text>
            <Text style={styles.details}>Estatus: {solicitud.estatus}</Text>
            </View>
        </View>

        <Text style={styles.footer}>
          Gracias por confiar en nuestro servicio
        </Text>

        <Text style={styles.social}>
          No olvides seguirnos en redes sociales!{' '}
        </Text>
      </Page>
    </Document>
  );
};
