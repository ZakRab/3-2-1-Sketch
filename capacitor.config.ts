import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'three21sketch.onrender.com',
  appName: 'drawing-game',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
