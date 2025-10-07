interface Type {
  [key: string]: string;
}

const Icon: Type = {
  fontSize: '20px',
  cursor: 'pointer',
  color: '#888888',
  marginBottom: ' -9px',

};
const Model = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  height: '70%',
  borderRadius: '25px',

};

const classes = { Icon, Model };

export default classes;
