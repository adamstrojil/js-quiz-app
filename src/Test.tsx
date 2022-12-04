function Main() {
  const cuteSuffix = ", my cutie <3";
  const rudeSuffix = ", you dickhead!";

  const printNiceDayMessage = (message: string) => message + cuteSuffix;
  const printBadDayMessage = (message: string) => message + rudeSuffix;
  //App component can access and use the `message` ("Hello ...") from the child component

  return (
    <div>
      <Greeting name="Patrik" createMessage={printBadDayMessage} />
      <Greeting name="Filipek" createMessage={printNiceDayMessage} />
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  name: string;
  createMessage: (message: string) => string;
};

function Greeting(props: Props) {
  const neutralGreeting = `Hello ${props.name}`;
  const finalGreeting = props.createMessage(neutralGreeting);
  //Greeting component uses function from props passed by App component, but provides it's own argument

  return (
    <div>
      {finalGreeting}
      <br />
    </div>
  );
}

// <App /> outputs: 
// Hello Patrik, you dickhead!
// Hello Filipek, my cutie <3








