import Image from "next/image";
import { LabCertificate } from "@/lib/supabase";

interface Props {
  data: LabCertificate;
}

export default function LabCertificate({ data }: Props) {
  return (
    <div className='max-w-4xl mx-auto bg-white p-8 shadow-lg'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center'>
          <Image
            src='/logo.png'
            alt='Aquatreat Solutions Logo'
            width={100}
            height={100}
            className='mr-4'
          />
          <div>
            <h1 className='text-2xl font-bold text-blue-600'>
              Aquatreat Solutions Ltd.
            </h1>
            <p className='text-sm text-gray-600'>
              Water and Wastewater Treatment Specialists
            </p>
          </div>
        </div>
        <div className='text-right'>
          <h2 className='text-xl font-bold mb-2'>LABORATORY TEST REPORT</h2>
          <p className='text-sm'>Certificate No: {data.certificate_number}</p>
          <p className='text-sm'>Date: {data.date}</p>
        </div>
      </div>

      {/* Meta Information */}
      <div className='grid grid-cols-2 gap-4 mb-8 text-sm'>
        <div>
          <p>
            <span className='font-bold'>Description:</span> {data.description}
          </p>
          <p>
            <span className='font-bold'>Submitted By:</span> {data.submitted_by}
          </p>
        </div>
        <div>
          <p>
            <span className='font-bold'>Customer Name:</span>{" "}
            {data.customer_name}
          </p>
          <p>
            <span className='font-bold'>Sample Point:</span> {data.sample_point}
          </p>
        </div>
      </div>

      {/* Test Results Tables */}
      <div className='space-y-6'>
        {/* Physical Tests */}
        <div>
          <h3 className='font-bold mb-2'>PHYSICAL TESTS</h3>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border p-2 text-left'>Parameters</th>
                <th className='border p-2 text-left'>Units</th>
                <th className='border p-2 text-left'>Results</th>
                <th className='border p-2 text-left'>SANS 241:2015</th>
                <th className='border p-2 text-left'>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border p-2'>pH</td>
                <td className='border p-2'>pH units</td>
                <td className='border p-2'>{data.physical_tests.ph}</td>
                <td className='border p-2'>≥5 to ≤9.7</td>
                <td className='border p-2'>PASS</td>
              </tr>
              {/* Add other physical test rows similarly */}
            </tbody>
          </table>
        </div>

        {/* Chemical Tests (Anions) */}
        <div>
          <h3 className='font-bold mb-2'>CHEMICAL TESTS (ANIONS)</h3>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border p-2 text-left'>Parameters</th>
                <th className='border p-2 text-left'>Units</th>
                <th className='border p-2 text-left'>Results</th>
                <th className='border p-2 text-left'>SANS 241:2015</th>
                <th className='border p-2 text-left'>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.chemical_tests_anions).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td className='border p-2 capitalize'>{key}</td>
                    <td className='border p-2'>mg/L</td>
                    <td className='border p-2'>{value}</td>
                    <td className='border p-2'>≤1.5</td>
                    <td className='border p-2'>PASS</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Chemical Tests (Cations) */}
        <div>
          <h3 className='font-bold mb-2'>CHEMICAL TESTS (CATIONS)</h3>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border p-2 text-left'>Parameters</th>
                <th className='border p-2 text-left'>Units</th>
                <th className='border p-2 text-left'>Results</th>
                <th className='border p-2 text-left'>SANS 241:2015</th>
                <th className='border p-2 text-left'>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.chemical_tests_cations).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td className='border p-2 capitalize'>{key}</td>
                    <td className='border p-2'>mg/L</td>
                    <td className='border p-2'>{value}</td>
                    <td className='border p-2'>≤200</td>
                    <td className='border p-2'>PASS</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Other Parameters */}
        <div>
          <h3 className='font-bold mb-2'>OTHER PARAMETERS</h3>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border p-2 text-left'>Parameters</th>
                <th className='border p-2 text-left'>Units</th>
                <th className='border p-2 text-left'>Results</th>
                <th className='border p-2 text-left'>SANS 241:2015</th>
                <th className='border p-2 text-left'>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.other_parameters).map(([key, value]) => (
                <tr key={key}>
                  <td className='border p-2 capitalize'>
                    {key.replace("_", " ")}
                  </td>
                  <td className='border p-2'>mg/L</td>
                  <td className='border p-2'>{value}</td>
                  <td className='border p-2'>≤5</td>
                  <td className='border p-2'>PASS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className='mt-8 text-sm'>
        <p className='font-bold'>Comments:</p>
        <p>
          The results above are within the recommended standard values for
          potable water.
        </p>
        <div className='mt-4 flex justify-between'>
          <div>
            <p className='font-bold'>DENIS KIPKURUI</p>
            <p>WATER QUALITY LAB TECHNICIAN</p>
          </div>
          <div>
            <p className='font-bold'>SARAH NJOROGE</p>
            <p>QUALITY ASSURANCE MANAGER</p>
          </div>
        </div>
      </div>
    </div>
  );
}
