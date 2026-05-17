import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { communityService } from '@/services/community/community.service';
import { CreateCommunityInput, UpdateCommunityInput } from '@/types/community/community.types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const { data, pagination } = await communityService.listCommunities({
      page,
      limit,
      search,
    });

    return NextResponse.json({
      success: true,
      data,
      pagination,
    });
  } catch (error) {
    console.error('Error al listar comunidades:', error);
    return NextResponse.json(
      { success: false, message: 'Error al listar comunidades' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      );
    }

    const data: CreateCommunityInput = await request.json();
    
    // Validar datos de entrada
    if (!data.nombre) {
      return NextResponse.json(
        { success: false, message: 'El nombre es requerido' },
        { status: 400 }
      );
    }

    const community = await communityService.createCommunity(data, session.user.id);

    return NextResponse.json({
      success: true,
      data: community,
    }, { status: 201 });
  } catch (error) {
    console.error('Error al crear comunidad:', error);
    return NextResponse.json(
      { success: false, message: 'Error al crear comunidad' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      );
    }

    const data: UpdateCommunityInput & { id: number } = await request.json();
    
    // Verificar que el usuario sea administrador de la comunidad
    const isAdmin = await communityService.isCommunityAdmin(data.id, session.user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: 'No tienes permisos para actualizar esta comunidad' },
        { status: 403 }
      );
    }

    const { id, ...updateData } = data;
    const community = await communityService.updateCommunity(id, updateData);

    return NextResponse.json({
      success: true,
      data: community,
    });
  } catch (error) {
    console.error('Error al actualizar comunidad:', error);
    return NextResponse.json(
      { success: false, message: 'Error al actualizar comunidad' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID de comunidad no proporcionado' },
        { status: 400 }
      );
    }

    // Verificar que el usuario sea administrador de la comunidad
    const isAdmin = await communityService.isCommunityAdmin(id, session.user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: 'No tienes permisos para eliminar esta comunidad' },
        { status: 403 }
      );
    }

    await communityService.deleteCommunity(id);

    return NextResponse.json({
      success: true,
      message: 'Comunidad eliminada correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar comunidad:', error);
    return NextResponse.json(
      { success: false, message: 'Error al eliminar comunidad' },
      { status: 500 }
    );
  }
}
