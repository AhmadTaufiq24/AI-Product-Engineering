import { createCompletion } from "@anvia/core";
import { getModel } from "./utils";

async function summarize(text: string) {
  const result = await createCompletion(getModel(), {
    instructions: `
    You are an expert meeting assistant.
    
    Combine multiple meeting summaries into ONE final report.
    
    Return only:
    
    ## Decisions
    
    ## Risks
    
    ## Action Items.
`,
    input: text,
  });

  return result.text;
}

async function main() {
  const chunks = [
    `
  Alice (PM): Selamat pagi semuanya. Hari ini kita membahas kesiapan peluncuran fitur QR Payment.
  
  Bob (Backend): Semua endpoint utama sudah selesai. Namun integrasi dengan payment gateway masih menunggu approval dari pihak vendor.
  
  Charlie (Frontend): Tampilan QR Payment sudah selesai. Kami hanya menunggu endpoint production dari backend.
  
  Alice: Apakah target release tanggal 30 Juni masih memungkinkan?
  
  Bob: Jika approval vendor datang minggu ini, target masih bisa tercapai.
    `,
  
    `
  Diana (QA): Kami menemukan beberapa bug saat melakukan pembayaran menggunakan QR statis. Pada beberapa kasus transaksi berhasil tetapi status di aplikasi masih "Pending".
  
  Bob: Kami menduga penyebabnya berasal dari callback payment gateway yang terkadang terlambat.
  
  Alice: Ini cukup berisiko karena dapat membingungkan pengguna.
  
  Diana: Selain itu, performa aplikasi mulai melambat ketika jumlah transaksi tinggi.
    `,
  
    `
  Alice: Oke, kita sepakati beberapa action item.
  
  - Backend akan berkoordinasi dengan vendor mengenai approval dan callback issue.
  - Frontend akan melakukan pengujian ulang setelah endpoint production tersedia.
  - QA akan melakukan regression testing setelah bug diperbaiki.
  - Target release tetap 30 Juni, tetapi akan dievaluasi kembali pada meeting hari Jumat apabila approval vendor belum diterima.
    `,
  ];

  // MAP
  const summaries = await Promise.all(
    chunks.map(async (chunk) => summarize(chunk))
  );

  console.log("Chunk Summaries:");
  console.log(summaries);

  // REDUCE
  const finalSummary = await summarize(summaries.join("\n\n"));

  console.log("\nFinal Summary:");
  console.log(finalSummary);
}

main();

// Menggunakan Map-Reduce Summarization karena untuk mensummarize hasil meeting yang panjang.