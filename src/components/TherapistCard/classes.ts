interface Card {
  [key: string]: string | number | Record<string, string | number>;
}

const card: Card = {
  maxWidth: '230px',
  maxHeight: '350px',
  padding: '0',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
};
const button: Card = {
  width: '100%',
  margin: '0',
  borderRadius: '0',
  marginTop: '5px',
};
const DoctorName: Card = {
  textAlign: 'center',
  paddingTop: '1px',
  margin: '0',
};
const therapistImage: Card = {
  marginBottom: '5px',
  '@media (max-width: 600px)': {
    height: '400px',
  },

};

const classes = {
  card, button, DoctorName, therapistImage,
};
export default classes;
