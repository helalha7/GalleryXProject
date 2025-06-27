import cloudinary from './cloudinary.js';

/**
 * Uploads an image or audio file to Cloudinary
 * @param {Buffer} buffer - The file buffer (from formData)
 * @param {string} filename - A base filename (no extension)
 * @param {string} mimetype - file.type (e.g. 'image/png', 'audio/mpeg')
 * @param {string} folder - Cloudinary folder to upload to
 * @returns {Promise<{ secure_url: string }>}
 */
export async function uploadToCloudinary(buffer, filename, mimetype, folder = 'uploads') {
    return new Promise((resolve, reject) => {
        const resourceType = mimetype.startsWith('audio/')
            ? 'video' // Cloudinary uses 'video' for audio too
            : mimetype.startsWith('image/')
                ? 'image'
                : 'raw';

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: resourceType,
                folder,
                public_id: `${filename}-${Date.now()}`,
            },
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
}
