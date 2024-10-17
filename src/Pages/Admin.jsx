import React, { useState } from 'react';
import { Client, Databases, Storage } from 'appwrite';
import service from '../appwrite/database';

const AdminDashboard = () => {
    // State for form fields and image
    const [formData, setFormData] = useState({
        companyName: '',
        taskDuration: '',
        category: '',
        telegramChatID: '',
        telegramChatInvite: '', // New state for Telegram chat invite link
        telegramAnnID: '', // Separate state for Telegram link
        telegramAnnInvite: '', // New state for Telegram announcement invite link
        twitter: '', // Twitter link
        instagram: '', // Instagram link
        facebook:'',
        linkedin: '', // LinkedIn link
        youtube: '', // YouTube link
        discord: '', // Discord link
        website: '',// Website link
        referralLink: '',


        companytelegramChatInvite: '', // Reset Telegram chat invite link
        companyTelegramAnnInvite: '', // Reset Telegram announcement invite link
        companyTwitter: '',
        companyFacebook: '',
        companyInstagram: '',
        companyLinkedin: '',
        companyYoutube: '', // Reset YouTube link
        companyDiscord: '', // Reset Discord link
        companyWebsite: '',
        companyMedium: '',
        companyReferralLink: ''
    });
    const [image, setImage] = useState(null);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Upload the image to Appwrite storage
            let imageFileId = '';
            if (image) {
                const imageFile = await service.uploadFile(image);
                imageFileId = imageFile.$id;
            }
            console.log(formData);
            // Save task data to Appwrite database
            const response = await service.addData({
                companyName: formData.companyName,
                taskDuration: formData.taskDuration, // E.g., "1 day", "2 days"
                category: formData.category,
                telegramChatID: formData.telegramChatID,
                telegramChatInvite: formData.telegramChatInvite, // Store Telegram chat invite link
                telegramAnnID: formData.telegramAnnID, // Store Telegram link
                telegramAnnInvite: formData.telegramAnnInvite, // Store Telegram announcement invite link
                twitter: formData.twitter,
                instagram: formData.instagram,
                linkedin: formData.linkedin,
                youtube: formData.youtube, // Store YouTube link
                discord: formData.discord, // Store Discord link
                website: formData.website, // Store website link
                medium: formData.medium, // Store website link
                referralLink: formData.referralLink,



                companytelegramChatInvite: formData.companytelegramChatInvite, // Store Telegram chat invite link
                companyTelegramAnnInvite: formData.companyTelegramAnnInvite, // Store Telegram announcement invite link
                companyTwitter: formData.companyTwitter,
                companyInstagram: formData.companyInstagram,
                companyLinkedin: formData.companyLinkedin,
                companyYoutube: formData.companyYoutube, // Store YouTube link
                companyDiscord: formData.companyDiscord, // Store Discord link
                companyWebsite: formData.companyWebsite, // Store website link
                companyReferralLink: formData.companyReferralLink,
                companyMedium: formData.companyMedium,

                image: imageFileId, // Store image file ID
            });

            console.log('Task added successfully:', response);

            // Clear form after submission
            setFormData({

                companyName: '',
                taskDuration: '',
                category: '',
                telegramChatID: '',
                telegramChatInvite: '', // Reset Telegram chat invite link
                telegramAnnID: '',
                telegramAnnInvite: '', // Reset Telegram announcement invite link
                twitter: '',
                facebook: '',
                instagram: '',
                linkedin: '',
                youtube: '', // Reset YouTube link
                discord: '', // Reset Discord link
                website: '',
                medium: '',
                referralLink: '',



                companytelegramChatInvite: '', // Reset Telegram chat invite link
                companyTelegramAnnInvite: '', // Reset Telegram announcement invite link
                companyTwitter: '',
                companyFacebook: '',
                companyInstagram: '',
                companyLinkedin: '',
                companyYoutube: '', // Reset YouTube link
                companyDiscord: '', // Reset Discord link
                companyWebsite: '',
                companyMedium: '',
                companyReferralLink: ''
            });
            setImage(null);

        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Handle input change for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="p-8 ">
            <h2 className="text-2xl font-bold mb-4">Add Task</h2>
            <form onSubmit={handleSubmit} className='mb-10'>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Task Duration <span className='text-gray-400'>( in hours )</span></label>
                    <input
                        type="text"
                        name="taskDuration"
                        value={formData.taskDuration}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black"
                        placeholder="e.g., 12 , 24 "
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 w-40" htmlFor="category">Exchange Type<span className="text-red-500 ml-2">*</span></label>
                    <select id="category" name="category" className="w-full px-1 py-2 bg-black text-white border border-transparent rounded-lg" value={formData.category} onChange={handleInputChange} required>
                        <option value="" className="bg-black text-black" disabled>Select a category</option>
                        <option value="social">Social</option>
                        <option value="premium">Premium</option>
                    </select>
                </div>


                {/* social media links for bounty tap */}
                <div className="mb-4 ">
                    <label className="block text-sm font-bold mb-2">Social Media Links (Bounty Tap)</label>
                    <input
                        type="text"
                        placeholder='Telegram Chat ID'
                        name="telegramChatID"
                        value={formData.telegramChatID}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"

                    />

                    <input
                        type="text"
                        name="telegramChatInvite"
                        placeholder='Telegram Chat Invite'
                        value={formData.telegramChatInvite}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        name="telegramAnnID"
                        placeholder='Telegram Ann ID'
                        value={formData.telegramAnnID}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"

                    />

                    <input
                        type="text"
                        name="telegramAnnInvite"
                        placeholder='Telegram Announcement Invite'
                        value={formData.telegramAnnInvite}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        name="referralLink"
                        placeholder="Referral Link"
                        value={formData.referralLink}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black"
                    />

                    <input
                        type="text"
                        name="twitter"
                        placeholder="Twitter Link"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />
                    <input
                        type="text"
                        name="linkedin"
                        placeholder="LinkedIn Link"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />
                    <input
                        type="text"
                        name="instagram"
                        placeholder="Instagram Link"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />
                    <input
                        type="text"
                        name="youtube"
                        placeholder="YouTube Link"
                        value={formData.youtube}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />
                    <input
                        type="text"
                        name="discord"
                        placeholder="Discord Link"
                        value={formData.discord}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />
                    <input
                        type="text"
                        name="website"
                        placeholder="Website Link"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        name="facebook"
                        placeholder="Facebook Link"
                        value={formData.facebook}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        name="medium"
                        placeholder="Medium Link"
                        value={formData.medium}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        name="referralLink"
                        placeholder="Referral Link"
                        value={formData.referralLink}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black"
                    />

                </div>


                {/* social media links for client company */}

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Social Media Links (Company)</label>

                    <input
                        type="text"
                        placeholder='Company Telegram Chat Invite'
                        name="companytelegramChatInvite"
                        value={formData.companytelegramChatInvite}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        placeholder='Company Telegram Announcement Invite'
                        name="companyTelegramAnnInvite"
                        value={formData.companyTelegramAnnInvite}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        placeholder="Company Twitter Link"
                        name="companyTwitter"
                        value={formData.companyTwitter}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        placeholder="Company Instagram Link"
                        name="companyInstagram"
                        value={formData.companyInstagram}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        placeholder="Company LinkedIn Link"
                        name="companyLinkedin"
                        value={formData.companyLinkedin}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        placeholder="Company YouTube Link"
                        name="companyYoutube"
                        value={formData.companyYoutube}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        placeholder="Company Discord Link"
                        name="companyDiscord"
                        value={formData.companyDiscord}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        placeholder="Company Website Link"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        placeholder="Company Referral Link"
                        name="companyReferralLink"
                        value={formData.companyReferralLink}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black mb-2"
                    />

                    <input
                        type="text"
                        placeholder="Company Medium Link"
                        name="companyMedium"
                        value={formData.companyMedium}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-black"
                    />
                </div>


                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Task Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full p-2 border rounded bg-black"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AdminDashboard;
