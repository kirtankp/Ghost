import ImageUpload from '../../../admin-x-ds/global/ImageUpload';
import React, {useContext} from 'react';
import SettingGroup from '../../../admin-x-ds/settings/SettingGroup';
import SettingGroupContent from '../../../admin-x-ds/settings/SettingGroupContent';
import TextField from '../../../admin-x-ds/global/TextField';
import useSettingGroup from '../../../hooks/useSettingGroup';
import {FileService, ServicesContext} from '../../providers/ServiceProvider';

const Facebook: React.FC = () => {
    const {
        currentState,
        saveState,
        focusRef,
        handleSave,
        handleCancel,
        updateSetting,
        getSettingValues,
        handleStateChange
    } = useSettingGroup();

    const {fileService} = useContext(ServicesContext) as {fileService: FileService};

    const [
        facebookTitle, facebookDescription, facebookImage, siteTitle, siteDescription
    ] = getSettingValues(['og_title', 'og_description', 'og_image', 'title', 'description']) as string[];

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSetting('og_title', e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSetting('og_description', e.target.value);
    };

    const handleImageUpload = async (file: File) => {
        const imageUrl = await fileService.uploadImage(file);
        updateSetting('og_image', imageUrl);
    };

    const handleImageDelete = () => {
        updateSetting('og_image', '');
    };

    const values = (
        <></>
    );

    const inputFields = (
        <SettingGroupContent>
            <ImageUpload
                height='200px'
                id='twitter-image'
                imageURL={facebookImage}
                onDelete={handleImageDelete}
                onUpload={handleImageUpload}
            >
                Upload Facebook image
            </ImageUpload>
            <TextField
                inputRef={focusRef}
                placeholder={siteTitle}
                title="Facebook title"
                value={facebookTitle}
                onChange={handleTitleChange}
            />
            <TextField
                placeholder={siteDescription}
                title="Facebook description"
                value={facebookDescription}
                onChange={handleDescriptionChange}
            />
        </SettingGroupContent>
    );

    return (
        <SettingGroup
            description='Customize structured data of your site'
            navid='facebook'
            saveState={saveState}
            state={currentState}
            title='Facebook card'
            onCancel={handleCancel}
            onSave={handleSave}
            onStateChange={handleStateChange}
        >
            {values}
            {currentState !== 'view' ? inputFields : ''}
        </SettingGroup>
    );
};

export default Facebook;