interface NameCardProps {
  name: string;
  age: number;
  gender: string;
  job: string;
}

export function NameCard(props: NameCardProps) {
  if (props.gender === 'male') {
    return (
      <div className='bg-rose-50-50'>
        <h1>Namecard</h1>
        <div>Name : {props.name}</div>
        <div>Age : {props.age}</div>
        <div>Gender : {props.gender}</div>
      </div>
    );
  }


  return (
    <div className='bg-blue-50'>
      <h1>Namecard</h1>
      <div>Name : {props.name}</div>
      <div>Age : {props.age}</div>
      <div>Gender : {props.gender}</div>
    </div>
  );
}
