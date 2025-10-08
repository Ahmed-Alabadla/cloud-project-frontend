interface Type {
  [key: string]: string | number ;
}

const SearchBoxStyle: Type = {
  width: '85%',
  maxWidth: 400,
  borderRadius: '999px',
  backgroundColor: '#eee',
  paddingLeft: 2,
  paddingRight: 2,
  marginBottom: '10px',

};

const SelectInputStyle: Type = {

  marginRight: '50px',
  backgroundColor: '#eee',
  borderRadius: '999px',
  marginBottom: '10px',

};

export { SearchBoxStyle, SelectInputStyle };
