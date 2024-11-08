export function sum(a: number, b: number): number {
  return a + b;
}

export async function getData() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const json = await response.json();
    return json; // คืนค่า JSON ที่ได้รับ
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // เพิ่มการโยนข้อผิดพลาด
  }
}
