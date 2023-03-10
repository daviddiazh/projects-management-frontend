import { ProjectStatus } from './ProjectStatus';
import { Box } from '@mui/material';
import useFormatDate from '../hooks/useFormatDate';
import { useDispatch, } from 'react-redux';
import { findProjectByIdReducer } from '../store/projects/projectsSlice';

export const ProjectCard = ({ project }: any) => {

    const { formatDate } = useFormatDate();
    
    const dispatch = useDispatch()

    return (
        <div>
            <div key={project._id} className='each-project-mp' onClick={ () => dispatch( findProjectByIdReducer(project) ) }>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <p
                        style={{
                            fontWeight: 600,
                            fontSize: 18,
                        }}
                    >
                        { project.title.length >= 27 ? project.title.substring(0, 27) + '...' : project.title }
                    </p>
                    <ProjectStatus status={ project.status } />
                </Box>
                <p
                    style={{
                        fontWeight: 400,
                        fontSize: 13,
                        color: 'var(--grayDark)',
                        paddingTop: 0
                    }}
                >
                    {
                        formatDate(project.createdAt)
                    }
                </p>
                {/* <div dangerouslySetInnerHTML={{ __html: project.description }} /> //TODO: Check it */}

                <p style={{ marginTop: 15 }}>ID: { project._id }</p>
            </div>
        </div>
    );
}
