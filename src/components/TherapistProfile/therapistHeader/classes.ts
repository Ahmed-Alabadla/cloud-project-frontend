interface Type {
    [key: string]: string;
}

const TypographyStyle: Type = {
  fontWeight: 'bold',
  marginBottom: '-25px',
  color: '#2B127B',

};

const BoxStyle: Type = {
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'inherit',
  width: '900px',
  marginTop: '8px',
};
const ModelStyle : Type = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const ButtonStyle: Type = {
  marginTop: '16px',
  fontSize: '12px',
  width: '160px',
};

export {
  TypographyStyle, BoxStyle, ModelStyle, ButtonStyle,
};
