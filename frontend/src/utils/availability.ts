const getAvailabilityInfo = (hospital: any) => {
  const total = Object.values(hospital.beds).reduce(
    (sum: number, bed: any) => sum + bed.total,
    0
  );
  const available = Object.values(hospital.beds).reduce(
    (sum: number, bed: any) => sum + bed.available,
    0
  );

  const ratio = total === 0 ? 0 : available / total;

  let status: 'available' | 'limited' | 'full';

  if (ratio === 0) status = 'full';
  else if (ratio < 0.3) status = 'limited';
  else status = 'available';

  return { status, ratio, available, total };
};
export { getAvailabilityInfo };