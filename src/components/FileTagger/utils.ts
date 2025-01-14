export function getFileURL(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        const newSrc = reader.result as string;
        resolve(newSrc);
      },
      false,
    );

    reader.readAsDataURL(file);
  });
}
