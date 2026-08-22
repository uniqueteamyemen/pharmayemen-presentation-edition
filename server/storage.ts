/**
 * Deliberately unconfigured storage boundary for the portable edition.
 * Connect a standard S3-compatible adapter only when file uploads are enabled.
 */
export async function storagePut() { throw new Error("File storage is not configured in the portable edition."); }
export async function storageGet() { throw new Error("File storage is not configured in the portable edition."); }
export async function storageGetSignedUrl() { throw new Error("File storage is not configured in the portable edition."); }
