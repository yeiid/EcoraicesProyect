import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { communityService } from '@/services/community/community.service';
import { CommunityRole } from '@/types/community/community.types';

type MemberOperation = 'join' | 'leave' | 'update-role';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      );
    }

    const { communityId, operation, userId, role } = await request.json();

    if (!communityId || !operation) {
      return NextResponse.json(
        { success: false, message: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }

    switch (operation as MemberOperation) {
      case 'join': {
        // Unirse a la comunidad
        await communityService.joinCommunity(communityId, session.user.id);
        return NextResponse.json({
          success: true,
          message: 'Te has unido a la comunidad exitosamente',
        });
      }

      case 'leave': {
        // Abandonar la comunidad
        await communityService.leaveCommunity(communityId, session.user.id);
        return NextResponse.json({
          success: true,
          message: 'Has abandonado la comunidad exitosamente',
        });
      }

      case 'update-role': {
        // Verificar que el usuario que realiza la acción sea administrador
        const isAdmin = await communityService.isCommunityAdmin(communityId, session.user.id);
        if (!isAdmin) {
          return NextResponse.json(
            { success: false, message: 'No tienes permisos para realizar esta acción' },
            { status: 403 }
          );
        }

        // Verificar que se proporcione un rol válido
        if (!role || !['MIEMBRO', 'MODERADOR', 'ADMIN'].includes(role)) {
          return NextResponse.json(
            { success: false, message: 'Rol no válido' },
            { status: 400 }
          );
        }

        // Verificar que el usuario objetivo exista
        if (!userId) {
          return NextResponse.json(
            { success: false, message: 'ID de usuario no proporcionado' },
            { status: 400 }
          );
        }

        // Actualizar el rol del miembro
        await communityService.updateMemberRole(
          communityId,
          userId,
          role as CommunityRole,
          session.user.id
        );

        return NextResponse.json({
          success: true,
          message: 'Rol actualizado exitosamente',
        });
      }

      default:
        return NextResponse.json(
          { success: false, message: 'Operación no válida' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error en la operación de miembros:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Error en la operación de miembros' 
      },
      { status: 500 }
    );
  }
}

// Obtener miembros de una comunidad
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const communityId = parseInt(searchParams.get('communityId') || '0');
    
    if (!communityId) {
      return NextResponse.json(
        { success: false, message: 'ID de comunidad no proporcionado' },
        { status: 400 }
      );
    }

    const members = await communityService.getCommunityMembers(communityId);
    
    return NextResponse.json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.error('Error al obtener miembros de la comunidad:', error);
    return NextResponse.json(
      { success: false, message: 'Error al obtener miembros de la comunidad' },
      { status: 500 }
    );
  }
}
