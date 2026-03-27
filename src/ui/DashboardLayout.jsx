// src/ui/DashboardLayout.jsx
import { useState } from 'react';
import MobileOverlay from './MobileOverlay';
import ButtonToggle from './ButtonToggle';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <MobileOverlay setOpen={setOpen} />}

      <ButtonToggle setOpen={setOpen} />

      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}
