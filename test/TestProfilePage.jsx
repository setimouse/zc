/**
 * 
 */
import React from 'react';
import { Image } from 'react-native';
import ProfilePage from '../components/pages/profile/ProfilePage';
import Avatar from '../assets/avatar.jpg';

const user = {
  name: '张春华',
  department: '安全生产部',
  tel: '13900003333',
  avatar: Avatar,
}

export default function TestProfilePage() {
  return (
    <ProfilePage user={user} />
  )
}
