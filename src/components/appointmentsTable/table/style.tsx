const headerCell = {
  textAlign: 'center', color: 'white', fontSize: '16px', textTransform: 'uppercase', fontStyle: 'bolder',
};
const bodyCell = (themeMode: string) => ({
  margin: '10px',
  textAlign: 'center',
  backgroundColor: themeMode === 'dark' ? '#181A1B' : '',
});
const spinner = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}; const container = {

  marginBottom: '40px',
  border: '#516eff7a solid 1px',
  borderRadius: '5px',
  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.077)',
  width: '100%',
  height: '500px',
};
const message = {
  position: 'absolute', left: '47%', top: '50%', transform: 'translate(-50px, -50px)',
};
const centerMessage = {
  position: 'absolute', top: '50%', left: '42%', transform: 'translate(-50px, -50px)',
};
export {
  headerCell, bodyCell, spinner, container, message, centerMessage,
};
