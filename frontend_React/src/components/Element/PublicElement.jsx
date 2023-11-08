import MainLayout from "layouts/MainLayout";

const PublicElement = ({ component: Component, hideContainer, ...rest }) => {
  return (
    <MainLayout hideContainer={hideContainer}>
      <Component {...rest} />
    </MainLayout>
  );
};

export default PublicElement;
