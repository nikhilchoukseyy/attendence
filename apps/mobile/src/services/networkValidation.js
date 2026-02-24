import NetInfo from '@react-native-community/netinfo';

export async function validateNetwork(expectedGatewayIp) {
  const net = await NetInfo.fetch();
  const isWifi = net.type === 'wifi';
  const gatewayIp = net.details?.gatewayIp || '';
  const localIp = net.details?.ipAddress || '';

  const prefix = (ip) => ip.split('.').slice(0, 3).join('.') + '.';
  const sameSubnet = expectedGatewayIp && localIp
    ? prefix(expectedGatewayIp) === prefix(localIp)
    : false;

  return {
    isWifi,
    gatewayIp,
    localIp,
    sameGateway: gatewayIp === expectedGatewayIp,
    sameSubnet,
    valid: isWifi && gatewayIp === expectedGatewayIp && sameSubnet
  };
}
