import styled from 'styled-components/native';

interface IProps {
  hour: number;
}

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const WeatherIcon = styled.Image`
  width: 100px;
  height: 100px;
`;

export const Loading = styled.ActivityIndicator`
  align-self: center;
  justify-self: center;
`;
export const InformationContainer = styled.View<IProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({hour}) => (hour < 18 ? '#f53f0d' : '#475059')};
`;
export const RealoadButton = styled.TouchableOpacity`
  margin-top: 32px;
  padding: 8px 16px;
  border-color: #fff;
  border-width: 1px;
`;

export const Margin = styled.View`
  margin: 8px;
`;
