function getSubnetPrefix(ip) {
  return ip.split('.').slice(0, 3).join('.') + '.';
}

function isInSame24Subnet(routerIp, deviceIp) {
  if (!routerIp || !deviceIp) return false;
  return getSubnetPrefix(routerIp) === getSubnetPrefix(deviceIp);
}

module.exports = { isInSame24Subnet };
