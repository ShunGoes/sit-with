import EditBlogEditor from '@/components/forms/admin/edit-blog'
import React from 'react'

export default function AdminEditBlogPage() {
  return (
    <div>
        <EditBlogEditor blog={{
          id: '',
          title: '',
          author: '',
          excerpt: '',
          coverImage: '',
          content: '',
        }} />
    </div>
  )
}
