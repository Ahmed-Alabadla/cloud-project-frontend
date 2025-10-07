interface Type {
  [key: string]: string | number ;
}

const SkeletonBoxStyle: Type = {
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

// eslint-disable-next-line import/prefer-default-export
export { SkeletonBoxStyle };
