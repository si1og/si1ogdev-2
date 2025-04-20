<template>
<svg width="100%" height="150px" viewBox="0 0 1000 150" xmlns="http://www.w3.org/2000/svg">
  <!-- Radial gain-mask -->
  <defs>
    <radialGradient id="radialGain" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="white" stop-opacity="1"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <mask id="gainMask">
      <rect width="100%" height="100%" fill="url(#radialGain)" />
    </mask>
  </defs>

  <!-- Background -->
  <!-- <rect width="100%" height="100%" fill="#0a0a0a"/> -->

  <!-- Grid lines -->
  <g stroke="#4fc3f7" stroke-width="0.5" mask="url(#gainMask)">
    <!-- Vertical lines every 25px -->
    <g>
      <!-- total of 40 lines for 1000px -->
      <!-- Generated manually for demo -->
      <line x1="0" y1="0" x2="0" y2="150" />
      <line x1="25" y1="0" x2="25" y2="150" />
      <line x1="50" y1="0" x2="50" y2="150" />
      <line x1="75" y1="0" x2="75" y2="150" />
      <line x1="100" y1="0" x2="100" y2="150" />
      <line x1="125" y1="0" x2="125" y2="150" />
      <line x1="150" y1="0" x2="150" y2="150" />
      <line x1="175" y1="0" x2="175" y2="150" />
      <line x1="200" y1="0" x2="200" y2="150" />
      <line x1="225" y1="0" x2="225" y2="150" />
      <line x1="250" y1="0" x2="250" y2="150" />
      <line x1="275" y1="0" x2="275" y2="150" />
      <line x1="300" y1="0" x2="300" y2="150" />
      <line x1="325" y1="0" x2="325" y2="150" />
      <line x1="350" y1="0" x2="350" y2="150" />
      <line x1="375" y1="0" x2="375" y2="150" />
      <line x1="400" y1="0" x2="400" y2="150" />
      <line x1="425" y1="0" x2="425" y2="150" />
      <line x1="450" y1="0" x2="450" y2="150" />
      <line x1="475" y1="0" x2="475" y2="150" />
      <line x1="500" y1="0" x2="500" y2="150" />
      <line x1="525" y1="0" x2="525" y2="150" />
      <line x1="550" y1="0" x2="550" y2="150" />
      <line x1="575" y1="0" x2="575" y2="150" />
      <line x1="600" y1="0" x2="600" y2="150" />
      <line x1="625" y1="0" x2="625" y2="150" />
      <line x1="650" y1="0" x2="650" y2="150" />
      <line x1="675" y1="0" x2="675" y2="150" />
      <line x1="700" y1="0" x2="700" y2="150" />
      <line x1="725" y1="0" x2="725" y2="150" />
      <line x1="750" y1="0" x2="750" y2="150" />
      <line x1="775" y1="0" x2="775" y2="150" />
      <line x1="800" y1="0" x2="800" y2="150" />
      <line x1="825" y1="0" x2="825" y2="150" />
      <line x1="850" y1="0" x2="850" y2="150" />
      <line x1="875" y1="0" x2="875" y2="150" />
      <line x1="900" y1="0" x2="900" y2="150" />
      <line x1="925" y1="0" x2="925" y2="150" />
      <line x1="950" y1="0" x2="950" y2="150" />
      <line x1="975" y1="0" x2="975" y2="150" />
    </g>

    <!-- Horizontal lines every 25px -->
    <g>
      <line x1="0" y1="0" x2="1000" y2="0" />
      <line x1="0" y1="25" x2="1000" y2="25" />
      <line x1="0" y1="50" x2="1000" y2="50" />
      <line x1="0" y1="75" x2="1000" y2="75" />
      <line x1="0" y1="100" x2="1000" y2="100" />
      <line x1="0" y1="125" x2="1000" y2="125" />
      <line x1="0" y1="150" x2="1000" y2="150" />
    </g>
  </g>
</svg>


</template>