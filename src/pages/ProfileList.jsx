import React, { useState, useEffect } from 'react';
import profilesData from '../profiles.json'; 
import ProfileCard from '../components/ProfileCard';

const ProfileList = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        setProfiles(profilesData);
    }, []);

    if (profiles.length === 0) {
        return <h1 className="text-center text-xl mt-10">Carregando perfis...</h1>;
    }

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Explore mais talentos incríveis!
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {profiles.map(profile => (
                    <ProfileCard 
                        key={profile.id} 
                        profile={profile}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProfileList;