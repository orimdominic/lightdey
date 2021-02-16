export const templater = (Template) => {
  return (args) => {
    const template = () => <Template {...args} />;
    return template.bind({});
  };
};
