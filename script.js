// ---------- Helpers de conversión ----------

function ipToInt(ip) {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
    return null;
  }
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function intToIp(int) {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255
  ].join('.');
}

function intToBinary(int) {
  return int.toString(2).padStart(32, '0');
}

function cidrToMaskInt(cidr) {
  if (cidr === 0) return 0;
  return (0xFFFFFFFF << (32 - cidr)) >>> 0;
}

function classifyIp(firstOctet) {
  if (firstOctet >= 1 && firstOctet <= 126) return 'Clase A';
  if (firstOctet === 127) return 'Loopback';
  if (firstOctet >= 128 && firstOctet <= 191) return 'Clase B';
  if (firstOctet >= 192 && firstOctet <= 223) return 'Clase C';
  if (firstOctet >= 224 && firstOctet <= 239) return 'Clase D (Multicast)';
  if (firstOctet >= 240) return 'Clase E (Reservada)';
  return '—';
}

// ---------- Render del bitmap (elemento distintivo) ----------

function renderBitmap(ipInt, cidr) {
  const bitmap = document.getElementById('bitmap');
  const octetsRow = document.getElementById('bitmapOctets');
  bitmap.innerHTML = '';
  octetsRow.innerHTML = '';

  const binary = intToBinary(ipInt);

  for (let i = 0; i < 32; i++) {
    const bitEl = document.createElement('div');
    const isNetworkBit = i < cidr;
    bitEl.className = 'bit ' + (isNetworkBit ? 'net-active' : 'host host-active');
    bitEl.setAttribute('data-bit', binary[i]);
    bitmap.appendChild(bitEl);
  }

  for (let o = 0; o < 4; o++) {
    const octetBits = binary.slice(o * 8, o * 8 + 8);
    const span = document.createElement('span');
    span.textContent = octetBits;
    octetsRow.appendChild(span);
  }
}

// ---------- Cálculo principal ----------

function calculate() {
  const ipInput = document.getElementById('ip').value.trim();
  const cidr = parseInt(document.getElementById('cidr').value, 10);
  const errorMsg = document.getElementById('errorMsg');
  const results = document.getElementById('results');
  const bitmapSection = document.getElementById('bitmapSection');

  const ipInt = ipToInt(ipInput);

  if (ipInt === null) {
    errorMsg.textContent = 'Dirección IP inválida. Usa el formato 192.168.1.0';
    results.style.opacity = '0.3';
    bitmapSection.style.opacity = '0.3';
    return;
  }

  errorMsg.textContent = '';
  results.style.opacity = '1';
  bitmapSection.style.opacity = '1';

  const maskInt = cidrToMaskInt(cidr);
  const wildcardInt = (~maskInt) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const totalHosts = Math.pow(2, 32 - cidr);
  let usableHosts, firstHost, lastHost;

  if (cidr >= 31) {
    // /31 y /32: casos especiales sin red/broadcast tradicionales
    usableHosts = cidr === 32 ? 1 : 2;
    firstHost = intToIp(networkInt);
    lastHost = intToIp(broadcastInt);
  } else {
    usableHosts = totalHosts - 2;
    firstHost = intToIp(networkInt + 1);
    lastHost = intToIp(broadcastInt - 1);
  }

  document.getElementById('rNetwork').textContent = intToIp(networkInt) + ' /' + cidr;
  document.getElementById('rMask').textContent = intToIp(maskInt);
  document.getElementById('rWildcard').textContent = intToIp(wildcardInt);
  document.getElementById('rBroadcast').textContent = intToIp(broadcastInt);
  document.getElementById('rFirstHost').textContent = firstHost;
  document.getElementById('rLastHost').textContent = lastHost;
  document.getElementById('rHostCount').textContent = usableHosts.toLocaleString('es-CO');
  document.getElementById('rClass').textContent = classifyIp(ipInt >>> 24);

  renderBitmap(ipInt, cidr);
}

// ---------- Eventos ----------

const cidrSlider = document.getElementById('cidr');
const cidrValueLabel = document.getElementById('cidrValue');

function updateCidrLabel() {
  cidrValueLabel.textContent = '/' + cidrSlider.value;
  const percent = (cidrSlider.value / 32) * 100;
  cidrSlider.style.setProperty('--fill', percent + '%');
}

cidrSlider.addEventListener('input', () => {
  updateCidrLabel();
  calculate();
});

document.getElementById('ip').addEventListener('input', calculate);
document.getElementById('calcBtn').addEventListener('click', calculate);
document.getElementById('ip').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') calculate();
});

// Cálculo inicial al cargar la página
updateCidrLabel();
calculate();
